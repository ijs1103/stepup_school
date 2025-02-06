import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

export interface AccountOptionItemProps {
  title: string;
  pressHandler: () => void;
}

const AccountOptionItem = ({title, pressHandler}: AccountOptionItemProps) => {
  return (
    <TouchableOpacity onPress={pressHandler}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AccountOptionItem;

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 19,
    color: '#423D36',
  },
});
