import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {NavBar} from '@/shared/ui/NavBar';
import {InfoInputButton} from '@/shared/ui/InfoInputButton';
import {useUser} from '@/features/auth/model/useUser';
import {CustomButton} from '@/shared/ui/CustomButton';
import {BodyInfo as CurrentBodyInfo} from '@/entities/user/model/stores/useUserSignupStore';
import {CustomSheet} from '@/shared/ui/CustomSheet';
import HeightInput from '@/features/auth/ui/BodyInfoScreen/HeightInput';
import WeightInput from '@/features/auth/ui/BodyInfoScreen/WeightInput';
import {useUpdateUser} from '@/features/setting/model/useUpdateUser';
import Toast from 'react-native-toast-message';
import {useHomeStackNavigation} from '@/app/navigation/RootNavigation';

interface BodyInfo {
  height?: number;
  weight?: number;
}

const BodyInfoChangeScreen = () => {
  const navigation = useHomeStackNavigation();
  const {data} = useUser();
  const {mutate} = useUpdateUser();
  const [currentInfo, setCurrentInfo] =
    useState<keyof CurrentBodyInfo>('gender');
  const [bodyInfo, setBodyInfo] = useState<BodyInfo>({
    height: data?.height,
    weight: data?.weight,
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const goBack = () => navigation.goBack();
  const openBottomSheet = useCallback(() => setIsBottomSheetOpen(true), []);
  const closeBottomSheet = useCallback(() => setIsBottomSheetOpen(false), []);
  const buttonPressHandler = useCallback(
    async (info: keyof BodyInfo) => {
      setCurrentInfo(info);
      openBottomSheet();
    },
    [openBottomSheet],
  );
  const handleBottomSheetClose = useCallback(() => {
    closeBottomSheet();
  }, [closeBottomSheet]);
  const bottomSheetSubmitHandler = useCallback(
    (value: string | number) => {
      setBodyInfo(prev => ({...prev, [currentInfo]: value}));
      closeBottomSheet();
    },
    [currentInfo, closeBottomSheet],
  );
  const changeButtonHandler = useCallback(() => {
    if (bodyInfo.weight === undefined || bodyInfo.height === undefined) {
      return;
    }
    mutate(
      {height: bodyInfo.height, weight: bodyInfo.weight},
      {
        onSuccess: () => {
          Toast.show({
            type: 'success',
            text1: '신체정보가 변경되었습니다.',
            position: 'top',
            autoHide: true,
            visibilityTime: 2000,
            onHide: goBack,
          });
        },
        onError: error => {
          Toast.show({
            type: 'error',
            text1: '신체정보 변경에 실패하였습니다.',
            text2: error.message,
            position: 'top',
            autoHide: true,
            visibilityTime: 2000,
          });
        },
      },
    );
  }, [bodyInfo]);

  return (
    <View style={styles.container}>
      <NavBar
        title={'신체 정보 수정'}
        titleColor={'#000'}
        backButtonIcon={'ArrowBackGray'}
      />
      <View style={styles.subcontainer}>
        <View style={styles.buttonContainer}>
          <InfoInputButton
            title={'신장'}
            info={bodyInfo.height && `${bodyInfo.height} cm`}
            pressHandler={() => buttonPressHandler('height')}
          />
          <InfoInputButton
            title={'체중'}
            info={bodyInfo.weight && `${bodyInfo.weight} kg`}
            pressHandler={() => buttonPressHandler('weight')}
          />
        </View>
        <CustomButton
          title={'변경하기'}
          textColor={'#fff'}
          backgroundColor={'#FB970C'}
          clickHandler={changeButtonHandler}
          disabled={
            !(bodyInfo.weight !== undefined && bodyInfo.height !== undefined)
          }
        />
      </View>
      <CustomSheet isOpen={isBottomSheetOpen} onClose={handleBottomSheetClose}>
        {currentInfo === 'height' && (
          <HeightInput submitHandler={bottomSheetSubmitHandler} />
        )}
        {currentInfo === 'weight' && (
          <WeightInput submitHandler={bottomSheetSubmitHandler} />
        )}
      </CustomSheet>
    </View>
  );
};

export default BodyInfoChangeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  subcontainer: {
    marginTop: 16,
    marginBottom: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    paddingHorizontal: 36,
    gap: 8,
  },
});
