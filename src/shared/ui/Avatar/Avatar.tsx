import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface Props {
  big?: boolean;
  small?: boolean;
  imageUrl?: string;
}

const Avatar = ({ big = false, small = false, imageUrl = undefined }: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: small ? 26 : big ? 120 : 40,
          height: small ? 26 : big ? 120 : 40,
          borderRadius: small ? 13 : big ? 60 : 20,
        },
      ]}>
      <Image
        source={imageUrl ? { uri: imageUrl } : undefined}
        style={styles.avatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D9D9D9',
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});

export default Avatar;
