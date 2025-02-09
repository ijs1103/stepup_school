import React, {useCallback} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import StepupLogo from '../../assets/stepup_logo.svg';
import {Spacer} from '@/shared/ui/Spacer';
import {KeyboardAvoidingLayout} from '@/shared/ui/KeyboardAvoidingLayout';
import {FORM_ERROR_MESSAGE, REGEX} from '@/shared/constants';
import {CustomButton} from '@/shared/ui/CustomButton';
import {DividerWithText} from '@/shared/ui/DividerWithText';
import {useAuthStackNavigation} from '@/app/navigation/RootNavigation';
import {SignInDTO, useSignIn} from '@/features/auth/model/useSignIn';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import Toast from 'react-native-toast-message';

interface IForm {
  userId: string;
  password: string;
}

const SignInScreen = () => {
  const authStackNavigation = useAuthStackNavigation();
  const signInMutation = useSignIn();
  const {setLoginData} = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<IForm>({mode: 'onChange'});

  const onValid = useCallback(
    ({userId, password}: IForm) => {
      const signInData: SignInDTO = {userId, password};
      signInMutation.mutate(signInData, {
        onSuccess: result => {
          return Toast.show({
            type: 'success',
            text1: '로그인 성공!',
            position: 'top',
            autoHide: true,
            visibilityTime: 2000,
            onHide: () => {
              setLoginData(result);
            },
          });
        },
        onError: error => {
          return Toast.show({
            type: 'error',
            text1: error.message,
            position: 'top',
            autoHide: true,
            visibilityTime: 2000,
          });
        },
      });
    },
    [setLoginData, signInMutation],
  );

  const signupHandler = useCallback(() => {
    authStackNavigation.navigate('SignUp');
  }, [authStackNavigation]);

  return (
    <KeyboardAvoidingLayout>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <StepupLogo />
        </View>
        <View style={styles.bottomSheet}>
          <Text style={styles.label}>로그인</Text>
          <Spacer size={57} />
          <View style={styles.formContainer}>
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: REGEX.USERID,
                  message: FORM_ERROR_MESSAGE.USERID,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="아이디를 입력해 주세요."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                />
              )}
              name="userId"
            />
            {errors.userId?.message && (
              <Text style={styles.errorMessage}>{errors.userId?.message}</Text>
            )}
            <Spacer size={22} />
            <Controller
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: REGEX.PASSWORD,
                  message: FORM_ERROR_MESSAGE.PASSWORD,
                },
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  style={styles.textInput}
                  placeholder="비밀번호를 입력해 주세요."
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  secureTextEntry
                />
              )}
              name="password"
            />
            {errors.password?.message && (
              <Text style={styles.errorMessage}>
                {errors.password?.message}
              </Text>
            )}
            <Spacer size={30} />
            <CustomButton
              title={'로그인'}
              textColor={'#fff'}
              backgroundColor={'#FB970C'}
              clickHandler={handleSubmit(onValid)}
              disabled={!isValid}
            />
            <DividerWithText text={'또는'} />
            <CustomButton
              title={'회원가입'}
              textColor={'#423D36'}
              backgroundColor={'#fff'}
              borderColor={'#FB970C'}
              clickHandler={signupHandler}
            />
          </View>
        </View>
      </View>
    </KeyboardAvoidingLayout>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBBC0C',
    alignItems: 'center',
  },
  logoContainer: {
    height: '40%',
    justifyContent: 'center',
  },
  bottomSheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    height: '60%',
    paddingHorizontal: 39,
    paddingVertical: 59,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  label: {
    fontSize: 20,
    color: '#19181B',
  },
  formContainer: {
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textInput: {
    width: 300,
    color: '#C7BBAB',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: '#C0B4B2',
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
  },
});
