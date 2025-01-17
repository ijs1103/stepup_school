import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import WritingButtonIcon from '../../../../../assets/writing_button.svg';

interface Props {
  pressHandler: () => void;
}

const WritingButton = ({pressHandler}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={pressHandler}>
      <WritingButtonIcon />
    </TouchableOpacity>
  );
};

export default WritingButton;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    elevation: 10,
  },
});
