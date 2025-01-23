import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {NavBar} from '@/shared/ui/NavBar';
import {ImageUploadingView} from '@/features/community/ui/WritingScreen/ImageUploadingView';
import {LongTextInput} from '@/features/community/ui/WritingScreen/LongTextInput';
import {launchImageLibrary} from 'react-native-image-picker';
import {CustomButton} from '@/shared/ui/CustomButton';
import Toast from 'react-native-toast-message';
import {useCommunityStackNavigation} from '@/app/navigation/RootNavigation';
import useKeyboardHeight from '@/shared/lib/hooks/useKeyboardHeight';
import {useFeed} from '@/features/community/model/useFeed';
import {useUser} from '@/features/auth/model/useUser';
import {useImageUpload} from '@/features/community/model/useImageUpload';

const WritingScreen = () => {
  const navigation = useCommunityStackNavigation();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [contentsText, setContentsText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(new FormData());
  const keyboardHeight = useKeyboardHeight();
  const {data: userData} = useUser();
  const {mutate: imageUploadMutate} = useImageUpload();
  const feedMutation = useFeed();

  const openImagePicker = useCallback(async () => {
    try {
      const albumResults = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 90,
        maxHeight: 90,
        quality: 0.9,
        selectionLimit: 6,
      });
      setImageUrls(
        albumResults.assets
          ?.map(item => item.uri)
          .filter((uri): uri is string => uri !== undefined) ?? [],
      );
      const newFormData = new FormData();
      if (albumResults.assets) {
        for (const item of albumResults.assets) {
          newFormData.append('files', {
            uri: item.uri,
            type: item.type,
            name: item.uri?.split('/').pop() || 'image.jpg',
          });
        }
      }
      setFormData(newFormData);
    } catch {
      Toast.show({
        type: 'error',
        text1: '이미지를 선택해주세요.',
        position: 'top',
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }, []);

  const imageCloseHandler = useCallback((url: string) => {
    setImageUrls(prev => prev.filter(value => value != url));
  }, []);

  const submitHandler = useCallback(() => {
    setIsLoading(true);
    if (imageUrls.length > 0) {
      imageUploadMutate(
        {requestBody: formData},
        {
          onSuccess: result => {
            console.log('이미지 업로드 성공');
            feedMutation.mutate(
              {
                userName: userData?.nickname ?? '',
                avatarUrl: userData?.profile_img ?? '',
                content: contentsText,
                photoKeys: result.keys,
                create_at: new Date().toISOString(),
              },
              {
                onSuccess: result => {
                  Toast.show({
                    type: 'success',
                    text1: '피드가 작성되었습니다.',
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 2000,
                    onHide: () => navigation.goBack(),
                  });
                },
                onError: error => {
                  Toast.show({
                    type: 'error',
                    text1: error.message,
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 2000,
                  });
                },
              },
            );
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1: `이미지 업로드 실패 - ${error.message}`,
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
          },
          onSettled: () => {
            setIsLoading(false);
          },
        },
      );
    } else {
      feedMutation.mutate(
        {
          userName: userData?.nickname ?? '',
          avatarUrl: userData?.profile_img ?? '',
          content: contentsText,
          photoKeys: [],
          create_at: new Date().toISOString(),
        },
        {
          onSuccess: result => {
            Toast.show({
              type: 'success',
              text1: '피드가 작성되었습니다.',
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
              onHide: () => navigation.goBack(),
            });
          },
          onError: error => {
            Toast.show({
              type: 'error',
              text1: error.message,
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
          },
        },
      );
    }
  }, [userData, formData, imageUrls, contentsText]);

  const isValid = useMemo(() => {
    return contentsText.length > 0;
  }, [contentsText]);

  return (
    <View style={styles.container}>
      <NavBar title={'글쓰기'} backButtonIcon={'ArrowBackGray'} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
        <View style={styles.subContainer}>
          <View style={styles.formContainer}>
            <ImageUploadingView
              label={'첨부 사진'}
              imageUrls={imageUrls}
              imageCloseHandler={imageCloseHandler}
              openImagePicker={openImagePicker}
            />
            <LongTextInput
              label={'피드 내용'}
              placeholder={'내용을 입력해 주세요.'}
              maxLength={100}
              textChangeHandler={setContentsText}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
      <View style={[styles.buttonContainer, {bottom: keyboardHeight}]}>
        <CustomButton
          title={'글 작성하기'}
          textColor={'#fff'}
          backgroundColor={'#FB970C'}
          clickHandler={submitHandler}
          isLoading={isLoading}
          disabled={!isValid}
        />
      </View>
    </View>
  );
};

export default WritingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  subContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  formContainer: {
    padding: 20,
    gap: 16,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
  },
});
