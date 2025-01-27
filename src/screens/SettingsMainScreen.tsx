import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import Avatar from '@/shared/ui/Avatar/Avatar';
import EditIcon from '../../assets/edit_Icon.svg';
import SettingListItem, {
  SettingListItemProps,
} from '@/features/setting/ui/SettingListItem';
import {useHomeStackNavigation} from '@/app/navigation/RootNavigation';
import {launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

const SettingsMainScreen = () => {
  const navigation = useHomeStackNavigation();
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [formData, setFormData] = useState(new FormData());

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

  const openImagePicker = useCallback(async () => {
    try {
      const albumResults = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 120,
        maxHeight: 120,
        quality: 1,
        selectionLimit: 1,
      });
      // 이미지를 선택했다면 저장하시겠냐고 팝업메시지 yes or no
      showTwoButtonAlert();
      setNewImageUrls(
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

  const showTwoButtonAlert = useCallback(
    () =>
      Alert.alert('이미지를 저장하시겠습니까?', undefined, [
        {
          text: '아니오',
          onPress: () => {},
          style: 'cancel',
        },
        {text: '네', onPress: () => {
            //TODO: 이미지 업로드 && 프로픨 업데이트 api 
        }},
      ]),
    [],
  );
  return (
    <View style={styles.container}>
      <View style={styles.myInfoContainer}>
        <View style={styles.avatarContainer}>
          <Avatar imageUrl={newImageUrls.at(0)} big />
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
