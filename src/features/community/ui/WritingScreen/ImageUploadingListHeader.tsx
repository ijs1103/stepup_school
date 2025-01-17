import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '@react-native-vector-icons/fontawesome';

interface Props {
  pressHandler: () => void;
}

export const ImageUploadingListHeader = ({pressHandler}: Props) => {
  return (
    <TouchableOpacity onPress={pressHandler} style={styles.container}>
      <Icon name={'camera'} size={24} color="gray" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    marginRight: 16,
  },
});
