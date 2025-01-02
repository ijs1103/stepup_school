import React, { useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SmileLogo from '../../assets/smile_logo.svg';
import { Spacer } from '@/shared/ui/Spacer';
import { CustomButton } from '@/shared/ui/CustomButton';
import { useUserSignupStore } from '@/entities/user/model/stores';

const SignUpCompleteScreen = () => {
  const { authInfo } = useUserSignupStore();
  const submitHandler = useCallback(() => {

  }, []);
  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <Text style={styles.nicknameContainer}><Text style={styles.nickname}>{authInfo.nickname ? authInfo.nickname : '신규 가입자'}</Text>{' 님,'}</Text>
        <Spacer size={36} />
        <SmileLogo />
        <Spacer size={48} />
        <Text style={styles.subtitle}>{'이제 스텝업 스쿨을\n사용할 수 있어요 :)'}</Text>
      </View>
      <View style={styles.submitButtonContainer}>
        <Text style={styles.label}>{'아래 버튼을 눌러 시작해 보세요!'}</Text>
        <CustomButton
          title={'스텝업 스쿨 시작하기'}
          textColor={'#fff'}
          backgroundColor={'#FB970C'}
          clickHandler={submitHandler} />
      </View>
    </View>
  );
}

export default SignUpCompleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  nicknameContainer: {
    textAlign: 'center',
    fontWeight: 500,
    fontSize: 24,
    color: '#423836',
  },
  nickname: {
    fontWeight: 900,
    fontSize: 24,
    color: '#FC661A',
  },
  subtitle: {
    fontWeight: 500,
    fontSize: 16,
    textAlign: 'center',
    color: '#423836',
  },
  submitButtonContainer: {
    gap: 5,
  },
  label: {
    textAlign: 'center',
    fontWeight: 300,
    fontSize: 12,
    color: '#19181B',
  },
});
