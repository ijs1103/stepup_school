import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Avatar from '@/shared/ui/Avatar/Avatar';
import EditIcon from '../../assets/edit_Icon.svg';
import SettingListItem, {
  SettingListItemProps,
} from '@/features/setting/ui/SettingListItem';
import {useHomeStackNavigation} from '@/app/navigation/RootNavigation';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {useImageUpload} from '@/features/community/model/useImageUpload';
import {useUpdateAvatar} from '@/features/setting/model/useUpdateAvatar';
import {useUser} from '@/features/auth/model/useUser';
import {NavBar} from '@/shared/ui/NavBar';

const SettingsMainScreen = () => {
  const navigation = useHomeStackNavigation();
  const [formData, setFormData] = useState(new FormData());
  const {data, refetch} = useUser();
  const [imageUrl, setImageUrl] = useState<string>('');
  const {mutate: imageUploadMutate} = useImageUpload();
  const {mutate: updateAvatarMutate} = useUpdateAvatar();
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );
  useEffect(() => {
    if (data?.profile_img) {
      setImageUrl(data.profile_img);
    }
  }, [data?.profile_img]);
  const settingListData: SettingListItemProps[] = useMemo(
    () => [
      {
        iconName: 'person',
        title: '계정',
        pressHandler: () => navigation.navigate('Account'),
      },
      {
        iconName: 'bell',
        title: '알림',
        pressHandler: () => navigation.navigate('Notification'),
      },
      {
        iconName: 'security',
        title: '개인정보 설정',
        pressHandler: () => navigation.navigate('PersonalInfoChange'),
      },
      {
        iconName: 'acon',
        title: '나의 업적',
        pressHandler: () => navigation.navigate('Achievement'),
      },
    ],
    [],
  );
  const showYesOrNoAlert = useCallback(
    () =>
      Alert.alert('이미지를 저장하시겠습니까?', undefined, [
        {
          text: '아니오',
          style: 'cancel',
          onPress: () => {
            setImageUrl(data?.profile_img ?? '');
          },
        },
        {
          text: '네',
          onPress: () => {
            imageUploadMutate(
              {requestBody: formData},
              {
                onSuccess: result => {
                  updateAvatarMutate(
                    {
                      imageKey: result.keys.at(0) ?? '',
                    },
                    {
                      onSuccess: () => {
                        Toast.show({
                          type: 'success',
                          text1: '프로필 이미지를 업데이트 하였습니다',
                          position: 'top',
                          autoHide: true,
                          visibilityTime: 2000,
                        });
                      },
                      onError: error => {
                        Toast.show({
                          type: 'error',
                          text1: `프로필 이미지 업데이트 실패 - ${error.message}`,
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
              },
            );
          },
        },
      ]),
    [data?.profile_img, formData],
  );

  const openImagePicker = useCallback(async () => {
    try {
      const {assets, didCancel} = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 120,
        maxHeight: 120,
        quality: 1,
        selectionLimit: 1,
      });
      if (didCancel) {
        return;
      }
      setImageUrl(
        assets
          ?.map(item => item.uri)
          .filter((uri): uri is string => uri !== undefined)
          .at(0) ?? '',
      );
      const newFormData = new FormData();
      if (assets) {
        for (const item of assets) {
          newFormData.append('files', {
            uri: item.uri,
            type: item.type,
            name: item.uri?.split('/').pop() || 'image.jpg',
          });
        }
      }
      setFormData(newFormData);
      showYesOrNoAlert();
    } catch {
      Toast.show({
        type: 'error',
        text1: '이미지를 선택해주세요.',
        position: 'top',
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }, [showYesOrNoAlert]);

  return (
    <View style={styles.container}>
      <NavBar backButtonIcon={'ArrowBackGray'} />
      <View style={styles.myInfoContainer}>
        <View style={styles.avatarContainer}>
          <Avatar imageUrl={imageUrl} big />
          <TouchableOpacity
            onPress={openImagePicker}
            style={styles.editIconContainer}>
            <EditIcon width={52} height={52} />
          </TouchableOpacity>
        </View>
        <Text style={styles.userName}>{'김철수'}</Text>
        <Text style={styles.schoolName}>{'제물포고등학교'}</Text>
        <Text style={styles.gradeClassName}>{'2학년 1반'}</Text>
      </View>
      {settingListData.map(item => {
        return <SettingListItem key={item.title} {...item} />;
      })}
    </View>
  );
};

export default SettingsMainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  myInfoContainer: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: -20,
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 32,
    marginVertical: 12,
  },
  schoolName: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#807986',
  },
  gradeClassName: {
    fontWeight: '500',
    fontSize: 12,
    lineHeight: 18,
    color: '#807986',
  },
});
