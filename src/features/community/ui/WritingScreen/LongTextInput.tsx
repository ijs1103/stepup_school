import React, {useState} from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

interface Props {
  label: string;
  placeholder: string;
  maxLength: number;
  textChangeHandler: (text: string) => void;
  inputAccessoryViewID?: string;
}

export const LongTextInput = ({
  label,
  placeholder,
  maxLength,
  textChangeHandler,
  inputAccessoryViewID,
}: Props) => {
  const [text, setText] = useState('');

  const onChangeText = (newText: string) => {
    if (newText.length <= maxLength) {
      setText(newText);
      textChangeHandler(newText);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={'dimgray'}
        value={text}
        onChangeText={onChangeText}
        maxLength={maxLength}
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
      />
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>
          {text.length}/{maxLength}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    color: '#111',
    padding: 12,
    textAlignVertical: 'top',
  },
  counterContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  counterText: {
    fontSize: 14,
    color: '#666',
  },
});
