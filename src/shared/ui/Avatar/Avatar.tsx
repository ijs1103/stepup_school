import React from 'react';
import {View, Image, StyleSheet, ImageSourcePropType} from 'react-native';

interface Props {
  small?: boolean;
  source?: ImageSourcePropType | undefined;
}

const Avatar = ({small = false, source = undefined}: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: small ? 26 : 40,
          height: small ? 26 : 40,
          borderRadius: small ? 13 : 20,
        },
      ]}>
      <Image source={source} style={styles.avatar} />
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
