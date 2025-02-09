import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MagicStick from '../../assets/magic_stick.svg';
import {Spacer} from '@/shared/ui/Spacer';
import {InfoInputButton} from '@/shared/ui/InfoInputButton';
import {CustomButton} from '@/shared/ui/CustomButton';
import {CustomSheet} from '@/shared/ui/CustomSheet';
import {useAuthStackNavigation} from '@/app/navigation/RootNavigation';
import {useUserSignupStore} from '@/features/user/model/stores';
import {BodyInfo} from '@/features/user/model/stores/useUserSignupStore';
import GenderInput from '@/features/auth/ui/BodyInfoScreen/GenderInput';
import BirthDateInput from '@/features/auth/ui/BodyInfoScreen/BirthDateInput';
import HeightInput from '@/features/auth/ui/BodyInfoScreen/HeightInput';
import WeightInput from '@/features/auth/ui/BodyInfoScreen/WeightInput';
import {formatDate} from '@/shared/lib/date/formatDate';

interface OptionalBodyInfo {
  gender?: '여성' | '남성';
  birthDate?: string;
  height?: number;
  weight?: number;
}

const BodyInfoScreen = () => {
  const navigation = useAuthStackNavigation();
  const {setBodyInfo: setBody} = useUserSignupStore();
  const [currentInfo, setCurrentInfo] = useState<keyof BodyInfo>('gender');
  const [bodyInfo, setBodyInfo] = useState<OptionalBodyInfo>({
    gender: undefined,
    birthDate: undefined,
    height: undefined,
    weight: undefined,
  });
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const isValid = useMemo(() => {
    return Object.values(bodyInfo).every(value => value !== undefined);
  }, [bodyInfo]);
  const submitHandler = useCallback(() => {
    setBody(bodyInfo);
    navigation.navigate('TermsAgreement');
  }, [setBody, navigation, bodyInfo]);
  const openBottomSheet = useCallback(() => setIsBottomSheetOpen(true), []);
  const closeBottomSheet = useCallback(() => setIsBottomSheetOpen(false), []);
  const pressHandler = useCallback(
    async (info: keyof BodyInfo) => {
      setCurrentInfo(info);
      openBottomSheet();
    },
    [openBottomSheet],
  );
  const resetBodyInfo = useCallback(() => {
    setBodyInfo(prev => ({...prev, [currentInfo]: undefined}));
  }, [currentInfo]);
  const handleBottomSheetClose = useCallback(() => {
    resetBodyInfo();
    closeBottomSheet();
  }, [closeBottomSheet, resetBodyInfo]);
  const bottomSheetSubmitHandler = useCallback(
    (value: string | number) => {
      setBodyInfo(prev => ({...prev, [currentInfo]: value}));
      closeBottomSheet();
    },
    [currentInfo, closeBottomSheet],
  );
  return (
    <View style={styles.container}>
      <View>
        <MagicStick />
        <Spacer size={20} />
        <Text style={styles.title}>
          {'칼로리 계산을 위한\n개인 정보를 입력해 주세요'}
        </Text>
        <Spacer size={3} />
        <Text style={styles.subTitle}>
          {
            '신체 정보는 데이터 분석의 중요한 근거가 되므로\n정확하게 기입해 주세요'
          }
        </Text>
        <Spacer size={38} />
        <View style={styles.infoInputButtonContainer}>
          <InfoInputButton
            title={'성별'}
            info={bodyInfo.gender}
            pressHandler={() => pressHandler('gender')}
          />
          <InfoInputButton
            title={'생년월일'}
            info={formatDate(bodyInfo.birthDate)}
            pressHandler={() => pressHandler('birthDate')}
          />
          <InfoInputButton
            title={'신장'}
            info={bodyInfo.height && `${bodyInfo.height} cm`}
            pressHandler={() => pressHandler('height')}
          />
          <InfoInputButton
            title={'체중'}
            info={bodyInfo.weight && `${bodyInfo.weight} kg`}
            pressHandler={() => pressHandler('weight')}
          />
        </View>
      </View>
      <View style={styles.submitButtonContainer}>
        <CustomButton
          title={'다음'}
          textColor={'#fff'}
          backgroundColor={'#FB970C'}
          disabled={!isValid}
          clickHandler={submitHandler}
        />
      </View>
      <CustomSheet isOpen={isBottomSheetOpen} onClose={handleBottomSheetClose}>
        {currentInfo === 'gender' && (
          <GenderInput submitHandler={bottomSheetSubmitHandler} />
        )}
        {currentInfo === 'birthDate' && (
          <BirthDateInput submitHandler={bottomSheetSubmitHandler} />
        )}
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

export default BodyInfoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 34,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    color: '#19181B',
    lineHeight: 24,
  },
  subTitle: {
    fontSize: 12,
    color: '#19181B',
    lineHeight: 16,
  },
  infoInputButtonContainer: {
    gap: 10,
  },
  submitButtonContainer: {
    alignItems: 'center',
    paddingBottom: 16,
  },
});
