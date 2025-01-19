import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

interface IKeyboardAvoidingLayout {
  children: React.ReactNode;
}

const KeyboardAvoidingLayout = ({children}: IKeyboardAvoidingLayout) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {children}
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
