import React, {useRef} from 'react';
import {
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Animated,
} from 'react-native';

interface ICustomButton {
  title: string;
  textColor: string;
  backgroundColor: string;
  borderColor?: string;
  isLoading?: boolean;
  disabled?: boolean;
  clickHandler: () => void;
}

const CustomButton = ({
  title,
  textColor,
  backgroundColor,
  borderColor,
  isLoading,
  disabled,
  clickHandler,
}: ICustomButton) => {
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
    <Animated.View
      style={{
        ...styles.container,
        transform: [{scale: animatedValue}],
        borderColor: borderColor || 'transparent',
        borderWidth: borderColor ? 1 : 0,
        borderRadius: 8,
        backgroundColor,
        overflow: 'hidden',
      }}>
      <Pressable
        style={[styles.button, {opacity: disabled ? 0.5 : 1}]}
        onPress={clickHandler}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={{...styles.text, color: textColor}}>{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: 300,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 10,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
