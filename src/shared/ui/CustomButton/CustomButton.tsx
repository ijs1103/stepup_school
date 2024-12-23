import React, { useRef } from 'react';
import { Text, StyleSheet, Pressable, ActivityIndicator, Animated } from 'react-native';

interface ICustomButton {
    title: string;
    textColor: string;
    backgroundColor: string;
    borderColor?: string;
    isLoading?: boolean;
    clickHandler: () => void;
}

const CustomButton = ({ title, textColor, backgroundColor, borderColor, isLoading, clickHandler }: ICustomButton) => {

    const animatedValue = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    return (
        // eslint-disable-next-line react-native/no-inline-styles
        <Animated.View style={{
            ...styles.container, transform: [{ scale: animatedValue }]
            , borderColor: borderColor || 'transparent', borderWidth: borderColor ? 1 : 0
        }}>
            <Pressable onPress={clickHandler} onPressIn={handlePressIn} onPressOut={handlePressOut}>
                {isLoading ? (
                    <ActivityIndicator color="white" />
                ) : (
                    <Text style={{ ...styles.text, color: textColor, backgroundColor }}>
                        {title}
                    </Text>
                )}
            </Pressable>
        </Animated.View>
    );
}

export default CustomButton;

const styles = StyleSheet.create({
    container: {
        width: 300,
        borderRadius: 8,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        paddingVertical: 10,
        fontWeight: 'bold',
        borderRadius: 8,
    },
});

