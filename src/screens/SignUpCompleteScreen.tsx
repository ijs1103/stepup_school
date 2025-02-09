import React, {useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Toast from 'react-native-toast-message';
import SmileLogo from '../../assets/smile_logo.svg';
import {Spacer} from '@/shared/ui/Spacer';
import {CustomButton} from '@/shared/ui/CustomButton';
import {useUserSignupStore} from '@/features/user/model/stores';
import {useSignUp, SignUpDTO} from '@/features/auth/model/useSignUp';
import {convertToTimestamp} from '@/shared/lib/date/converToTimestamp';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import {SignInDTO, useSignIn} from '@/features/auth/model/useSignIn';

const SignUpCompleteScreen = () => {
  const {authInfo, schoolInfo, bodyInfo} = useUserSignupStore();
  const signUpMutation = useSignUp();
  const signInMutation = useSignIn();
  const {setLoginData} = useAuthStore();
  const signupSuccessHandler = useCallback(() => {
    const signInData: SignInDTO = {
      userId: authInfo.userId,
      password: authInfo.password,
    };
    signInMutation.mutate(signInData, {
      onSuccess: result => {
        setLoginData(result);
      },
      onError: error => {
        return Toast.show({
          type: 'error',
          text1: error.message,
          position: 'top',
        });
      },
    });
  }, [authInfo.password, authInfo.userId, setLoginData, signInMutation]);

  const submitHandler = useCallback(() => {
    const requestBody: SignUpDTO = {
      userId: authInfo.userId,
      name: authInfo.name,
      nickname: authInfo.nickname,
      password: authInfo.password,
      school_name: schoolInfo.name,
      grade: schoolInfo.grade,
      class: schoolInfo.class,
      gender: bodyInfo.gender === '남성',
      height: bodyInfo.height,
      weight: bodyInfo.weight,
      birth_date: convertToTimestamp(bodyInfo.birthDate),
    };

    signUpMutation.mutate(requestBody, {
      onSuccess: _ => {
        return Toast.show({
          type: 'success',
          text1: '회원가입 성공!',
          position: 'top',
          onHide: signupSuccessHandler,
        });
      },
      onError: error => {
        return Toast.show({
          type: 'error',
          text1: error.message,
          position: 'top',
        });
      },
    });
  }, [
    authInfo.name,
    authInfo.nickname,
    authInfo.password,
    authInfo.userId,
    bodyInfo.birthDate,
    bodyInfo.gender,
    bodyInfo.height,
    bodyInfo.weight,
    schoolInfo.class,
    schoolInfo.grade,
    schoolInfo.name,
    signUpMutation,
    signupSuccessHandler,
  ]);
  return (
    <View style={styles.container}>
      <View></View>
      <View>
        <Text style={styles.nicknameContainer}>
          <Text style={styles.nickname}>
            {authInfo.nickname ? authInfo.nickname : '신규 가입자'}
          </Text>
          {' 님,'}
        </Text>
        <Spacer size={36} />
        <SmileLogo />
        <Spacer size={48} />
        <Text style={styles.subtitle}>
          {'이제 스텝업 스쿨을\n사용할 수 있어요 :)'}
        </Text>
      </View>
      <View style={styles.submitButtonContainer}>
        <Text style={styles.label}>{'아래 버튼을 눌러 시작해 보세요!'}</Text>
        <CustomButton
          title={'스텝업 스쿨 시작하기'}
          textColor={'#fff'}
          backgroundColor={'#FB970C'}
          clickHandler={submitHandler}
        />
      </View>
    </View>
  );
};

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
    fontWeight: '500',
    fontSize: 24,
    color: '#423836',
    lineHeight: 28,
  },
  nickname: {
    fontWeight: '900',
    fontSize: 24,
    color: '#FC661A',
  },
  subtitle: {
    fontWeight: '500',
    fontSize: 16,
    textAlign: 'center',
    color: '#423836',
    lineHeight: 20,
  },
  submitButtonContainer: {
    gap: 5,
    paddingBottom: 16,
  },
  label: {
    textAlign: 'center',
    fontWeight: '300',
    fontSize: 12,
    color: '#19181B',
  },
});
