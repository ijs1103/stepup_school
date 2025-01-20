import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { NavBar } from '@/shared/ui/NavBar';
import { ImageUploadingView } from '@/features/community/ui/WritingScreen/ImageUploadingView';
import { LongTextInput } from '@/features/community/ui/WritingScreen/LongTextInput';
import { launchImageLibrary } from 'react-native-image-picker';
import { CustomButton } from '@/shared/ui/CustomButton';
import Toast from 'react-native-toast-message';
import { useCommunityStackNavigation } from '@/app/navigation/RootNavigation';
import useKeyboardHeight from '@/shared/lib/hooks/useKeyboardHeight';

const WritingScreen = () => {
  const navigation = useCommunityStackNavigation();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [contentsText, setContentsText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const keyboardHeight = useKeyboardHeight();

  const openImagePicker = useCallback(async () => {
    try {
      const albumResults = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 90,
        maxHeight: 90,
        quality: 0.8,
        selectionLimit: 6,
      });
      setImageUrls(
        albumResults.assets
          ?.map(item => item.uri)
          .filter((uri): uri is string => uri !== undefined) ?? [],
      );
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
    try {
      setIsLoading(true);
      //TODO: 이미지 업로드 로직
      Toast.show({
        type: 'success',
        text1: '글작성 성공',
        position: 'top',
        autoHide: true,
        visibilityTime: 2000,
        onHide: () => navigation.navigate('Community'),
      });
    } catch (error) {
      console.log(`이미지 업로드 에러: ${error}`);
      Toast.show({
        type: 'error',
        text1: '글작성 중 에러가 발생하였습니다.',
        position: 'top',
        autoHide: true,
        visibilityTime: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [navigation]);

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
      <View style={[styles.buttonContainer, { bottom: keyboardHeight }]}>
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
