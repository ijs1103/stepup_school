import { CustomButton } from '@/shared/ui/CustomButton';
import { FormInput } from '@/shared/ui/FormInput';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

interface IForm {
    CODE: string;
}

interface Props {
    submitHandler: (value: string | number) => void;
}

const SchoolCodeInput = ({ submitHandler }: Props) => {
    const { control, handleSubmit, formState: { isValid } } = useForm<IForm>({ mode: 'onChange' });

    const onValid = useCallback(({ CODE }: IForm) => {
        submitHandler(CODE);
    }, [submitHandler]);

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{'학교 코드'}</Text>
                <Text style={styles.description}>{'영문자/숫자로 이루어진 학교 고유 코드'}</Text>
            </View>
            <View style={styles.formContainer}>
                <FormInput
                    name={'CODE'}
                    textInputConf={{ placeholder: '6자 이상' }}
                    control={control} />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title={'확인'}
                    textColor={'#fff'}
                    backgroundColor={'#FB970C'}
                    disabled={!isValid}
                    clickHandler={handleSubmit(onValid)} />
            </View>
        </View>
    );
};

export default SchoolCodeInput;

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 400,
        backgroundColor: '#fff',
        paddingTop: 53,
        paddingBottom: 28,
        paddingHorizontal: 39,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
        width: '100%',
    },
    title: {
        fontSize: 20,
        fontWeight: 500,
        color: '#19181B',
    },
    description: {
        fontSize: 10,
        color: '#807986',
    },
    formContainer: {
        flexShrink: 0,
        width: '80%',
    },
    buttonContainer: {
        marginBottom: 10,
    },
});
