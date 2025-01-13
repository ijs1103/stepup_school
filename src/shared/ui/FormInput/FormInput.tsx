import { FORM_ERROR_MESSAGE, REGEX } from '@/shared/constants';
import React, { RefObject, useState, useRef, useEffect } from 'react';
import { Control, Controller } from 'react-hook-form';
import { View, Text, KeyboardTypeOptions, TextInput, StyleSheet, Animated } from 'react-native';
import { ISignUpFormField } from '@/features/auth/model/types';

interface Props {
    name: ISignUpFormField;
    errorMessage?: string;
    textInputConf: ITextInputConfig;
    control: Control<any>;
    onNext?: () => void;
    inputRef?: RefObject<TextInput>;
}

type ITextInputConfig = {
    keyboardType?: KeyboardTypeOptions;
    maxLength?: number;
    placeholder?: string;
    secureTextEntry?: boolean;
};

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const FormInput = ({ name, errorMessage, textInputConf, control, onNext = () => { }, inputRef }: Props) => {
    const borderColorAnim = useRef(new Animated.Value(0)).current;
    const [isFocused, setIsFocused] = useState(false);
    useEffect(() => {
        Animated.timing(borderColorAnim, {
            toValue: isFocused ? 1 : 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    }, [borderColorAnim, isFocused]);

    const borderBottomColor = borderColorAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#C0B4B2', '#FB970C'],
    });

    return (
        <View>
            <Controller
                control={control}
                name={name}
                rules={{
                    required: true,
                    pattern: {
                        value: REGEX[name],
                        message: FORM_ERROR_MESSAGE[name],
                    },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <AnimatedTextInput
                        style={{ ...styles.textInput, borderBottomColor }}
                        placeholderTextColor={'#C7BBAB'}
                        onChangeText={onChange}
                        onFocus={() => {
                            setIsFocused(true);
                        }}
                        onBlur={() => {
                            onBlur();
                            setIsFocused(false);
                        }}
                        value={value}
                        autoCapitalize="none"
                        onSubmitEditing={() => onNext()}
                        ref={inputRef}
                        {...textInputConf}
                    />
                )}
            />
            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </View>
    );
}

export default FormInput;

const styles = StyleSheet.create({
    textInput: {
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderBottomWidth: 1,
        textAlign: 'center',
        fontSize: 16,
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
    },
});
