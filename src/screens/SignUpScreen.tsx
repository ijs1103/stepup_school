import React, { useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import SmileLogo from '../../assets/smile_logo_small.svg';
import { Spacer } from '@/shared/ui/Spacer';
import { SignupLabel } from '@/features/auth/ui';
import { FormInput } from '@/shared/ui/FormInput';
import { useForm } from 'react-hook-form';
import { CustomButton } from '@/shared/ui/CustomButton';
import { useUserSignupStore } from '@/entities/user/model/stores';
import { useAuthStackNavigation } from '@/app/navigation/RootNavigation';
import { KeyboardAvoidingLayout } from '@/shared/ui/KeyboardAvoidingLayout';
import { ISignUpForm } from '@/features/auth/model/types';

const SignUpScreen = () => {
    const navigation = useAuthStackNavigation();
    const nicknameRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const passwordRef = useRef<TextInput>(null);
    const { control, handleSubmit, formState: { errors, isValid } } = useForm<ISignUpForm>({ mode: 'onChange' });
    const { setAuthInfo } = useUserSignupStore();
    const onValid = useCallback(({ USERID, NAME, NICKNAME, PASSWORD }: ISignUpForm) => {
        setAuthInfo({ userId: USERID, name: NAME, nickname: NICKNAME, password: PASSWORD });
        navigation.navigate('SchoolInfo');
    }, [navigation, setAuthInfo]);

    return (
        <KeyboardAvoidingLayout>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                    <Spacer size={90} />
                    <SmileLogo />
                    <Spacer size={16} />
                    <Text style={styles.title}>
                        <Text style={styles.boldText}>{'스텝업 스쿨'}</Text>
                        {' 사용을 위해\n아래 내용을 입력해 주세요'}
                    </Text>
                    <Spacer size={32} />
                    <View style={styles.formContainer}>
                        <SignupLabel title={'이름을 알려주세요'} subTitle={'⚠ 실제 이름이에요'} />
                        <Spacer size={16} />
                        <FormInput
                            name={'NAME'}
                            textInputConf={{
                                maxLength: 18,
                                placeholder: '김OO',
                            }}
                            control={control}
                            errorMessage={errors.NAME?.message}
                            onNext={() => nicknameRef.current?.focus()}
                        />
                        <Spacer size={40} />
                        <SignupLabel title={'별명을 알려주세요'} subTitle={'⚠ 앱에서 보여지는 이름이에요'} />
                        <Spacer size={16} />
                        <FormInput
                            name={'NICKNAME'}
                            textInputConf={{
                                maxLength: 10,
                                placeholder: '배고픈 햄스터',
                            }}
                            control={control}
                            errorMessage={errors.NICKNAME?.message}
                            onNext={() => emailRef.current?.focus()}
                            inputRef={nicknameRef}
                        />
                        <Spacer size={40} />
                        <SignupLabel title={'아이디를 입력해 주세요'} subTitle={'⚠ 학교에서 제공한 고유 아이디를 입력해 주세요'} />
                        <Spacer size={16} />
                        <FormInput
                            name={'USERID'}
                            textInputConf={{
                                maxLength: 40,
                                placeholder: 'abcde123',
                            }}
                            control={control}
                            errorMessage={errors.USERID?.message}
                            onNext={() => passwordRef.current?.focus()}
                            inputRef={nicknameRef}
                        />
                        <Spacer size={40} />
                        <SignupLabel title={'비밀번호를 입력해 주세요'} subTitle={'⚠ 영문자, 특수기호를 포함해 8자 이상으로 입력해 주세요'} />
                        <Spacer size={16} />
                        <FormInput
                            name={'PASSWORD'}
                            textInputConf={{
                                maxLength: 16,
                                placeholder: '********',
                                secureTextEntry: true,
                            }}
                            control={control}
                            errorMessage={errors.PASSWORD?.message}
                            inputRef={passwordRef}
                        />
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <CustomButton title={'다음'} textColor={'#fff'} backgroundColor={'#FB970C'} disabled={!isValid} clickHandler={handleSubmit(onValid)} />
                </View>
            </View>
        </KeyboardAvoidingLayout>
    );
};

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 34,
        paddingBottom: 16,
    },
    scrollView: {
        flex: 1,
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        lineHeight: 24,
    },
    boldText: {
        fontWeight: 'bold',
    },
    formContainer: {
        paddingHorizontal: 13,
    },
    buttonContainer: {
        alignItems: 'center',
        paddingBottom: 16,
    },
});
