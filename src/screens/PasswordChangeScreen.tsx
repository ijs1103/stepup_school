import {useHomeStackNavigation} from '@/app/navigation/RootNavigation';
import {useUpdatePassword} from '@/features/setting/model/useUpdatePassword';
import {useVerifyPassword} from '@/features/setting/model/useVerifyPassword';
import {FORM_ERROR_MESSAGE, REGEX} from '@/shared/constants';
import {CustomButton} from '@/shared/ui/CustomButton';
import {NavBar} from '@/shared/ui/NavBar';
import {Spacer} from '@/shared/ui/Spacer';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import Toast from 'react-native-toast-message';

interface IForm {
  currentPassword: string;
  newPassword: string;
  newPasswordCheck: string;
}

const PasswordChangeScreen = () => {
  const navigation = useHomeStackNavigation();
  const {
    control,
    getValues,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<IForm>({mode: 'onChange'});
  const {mutate: verifyPasswordMutate} = useVerifyPassword();
  const {mutate: updatePasswordMutate} = useUpdatePassword();
  const onValid = ({currentPassword, newPassword}: IForm) => {
    verifyPasswordMutate(
      {password: currentPassword},
      {
        onSuccess: result => {
          if (!result.valid) {
            Toast.show({
              type: 'error',
              text1: '현재 비밀번호를 잘못 입력하였습니다.',
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
            return;
          }
          updatePasswordMutate(
            {password: currentPassword, newPassword: newPassword},
            {
              onSuccess: () => {
                Toast.show({
                  type: 'success',
                  text1: '비밀번호가 변경되었습니다.',
                  position: 'top',
                  autoHide: true,
                  visibilityTime: 2000,
                  onHide: () => {
                    navigation.goBack();
                  },
                });
              },
              onError: error => {
                Toast.show({
                  type: 'error',
                  text1: `비밀번호 업데이트 실패 - ${error.message}`,
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
            text1: `비밀번호 검증 실패 - ${error.message}`,
            position: 'top',
            autoHide: true,
            visibilityTime: 2000,
          });
        },
      },
    );
  };

  return (
    <View style={styles.container}>
      <NavBar
        title={'비밀번호 변경'}
        titleColor={'#000'}
        backButtonIcon={'ArrowBackGray'}
      />
      <View style={styles.subcontainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>{'현재 비밀번호'}</Text>
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
            name={'currentPassword'}
          />
          {errors.currentPassword?.message && (
            <Text style={styles.errorMessage}>
              {errors.currentPassword?.message}
            </Text>
          )}
          <Spacer size={70} />
          <Text style={styles.label}>{'새로운 비밀번호'}</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: REGEX.PASSWORD,
                message: FORM_ERROR_MESSAGE.PASSWORD,
              },
              validate: {
                samePassword: (value: string) =>
                  value !== getValues('currentPassword') ||
                  FORM_ERROR_MESSAGE.PASSWORD_SAME,
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
            name={'newPassword'}
          />
          {errors.newPassword?.message && (
            <Text style={styles.errorMessage}>
              {errors.newPassword?.message}
            </Text>
          )}
          <Spacer size={35} />
          <Text style={styles.label}>{'새로운 비밀번호 확인'}</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              validate: {
                samePassword: (value: string) =>
                  value === getValues('newPassword') ||
                  FORM_ERROR_MESSAGE.PASSWORD_CHECK,
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
            name={'newPasswordCheck'}
          />
          {errors.newPasswordCheck?.message && (
            <Text style={styles.errorMessage}>
              {errors.newPasswordCheck?.message}
            </Text>
          )}
        </View>
        <CustomButton
          title={'변경하기'}
          textColor={'#fff'}
          backgroundColor={'#FB970C'}
          clickHandler={handleSubmit(onValid)}
          disabled={!isValid}
        />
      </View>
    </View>
  );
};

export default PasswordChangeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    paddingHorizontal: 36,
  },
  subcontainer: {
    marginTop: 70,
    marginBottom: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 19,
    color: '#423836',
    marginBottom: 10,
  },
  textInput: {
    color: '#391713',
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#F2F0EF',
    borderRadius: 13,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
});
