import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import EmptyImage from '../../../../../assets/empty_image.svg';

interface Props {
  title: string;
}

const ListEmptyComponent = ({title}: Props) => {
  return (
    <View style={styles.container}>
      <EmptyImage />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 16,
    color: '#968C7E',
  },
});
