import {useHomeStackNavigation} from '@/app/navigation/RootNavigation';
import {useCheckNickname} from '@/features/setting/model/useCheckNickname';
import {useUpdateNickname} from '@/features/setting/model/useUpdateNickname';
import {useUpdateUser} from '@/features/setting/model/useUpdateUser';
import {FORM_ERROR_MESSAGE, REGEX} from '@/shared/constants';
import {CustomButton} from '@/shared/ui/CustomButton';
import {NavBar} from '@/shared/ui/NavBar';
import {Spacer} from '@/shared/ui/Spacer';
import React, {useCallback} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import Toast from 'react-native-toast-message';

interface IForm {
  nickname: string;
}

const PersonalInfoChangeScreen = () => {
  const navigation = useHomeStackNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm<IForm>({mode: 'onChange'});
  const {mutate: checkNicknameMutate} = useCheckNickname();
  const {mutate: updateNicknameMutate} = useUpdateNickname();
  const navigateToPersonalInfoChange = useCallback(() => {
    navigation.navigate('PersonalInfoChange');
  }, []);
  const onValid = ({nickname}: IForm) => {
    checkNicknameMutate(
      {nickname},
      {
        onSuccess: result => {
          if (result.available) {
            updateNicknameMutate(
              {nickname},
              {
                onSuccess: () => {
                  Toast.show({
                    type: 'success',
                    text1: '닉네임이 변경되었습니다.',
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 2000,
                  });
                },
                onError: () => {
                  Toast.show({
                    type: 'error',
                    text1: '닉네임이 중복됩니다.',
                    position: 'top',
                    autoHide: true,
                    visibilityTime: 2000,
                  });
                },
              },
            );
          } else {
            Toast.show({
              type: 'error',
              text1: '닉네임이 중복됩니다.',
              position: 'top',
              autoHide: true,
              visibilityTime: 2000,
            });
          }
        },
      },
    );
  };
  return (
    <View style={styles.container}>
      <NavBar
        title={'개인정보 설정'}
        titleColor={'#423836'}
        backButtonIcon={'ArrowBackGray'}
      />
      <View style={styles.subcontainer}>
        <View style={styles.formContainer}>
          <Text style={styles.label}>{'별명'}</Text>
          <Controller
            control={control}
            rules={{
              required: true,
              pattern: {
                value: REGEX.NICKNAME,
                message: FORM_ERROR_MESSAGE.NICKNAME,
              },
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textInput}
                placeholder="배고픈 햄스터"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                autoCapitalize="none"
                maxLength={10}
              />
            )}
            name={'nickname'}
          />
          {errors.nickname?.message && (
            <Text style={styles.errorMessage}>{errors.nickname?.message}</Text>
          )}
          <Spacer size={34} />
          <TouchableOpacity
            onPress={navigateToPersonalInfoChange}
            style={styles.bodyInfoChangeButton}>
            <Text>{'신체 정보 수정'}</Text>
          </TouchableOpacity>
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

export default PersonalInfoChangeScreen;

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
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderBottomWidth: 1,
    fontSize: 16,
  },
  label: {
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
    color: '#423836',
    marginBottom: 10,
  },
  errorMessage: {
    color: 'red',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  bodyInfoChangeButton: {
    backgroundColor: '#F2F0EF',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 17,
  },
});
