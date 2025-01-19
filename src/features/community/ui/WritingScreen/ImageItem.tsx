import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

interface Props {
  imageUrl: string;
}

const ImageItem = ({imageUrl}: Props) => {
  return (
    <TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: imageUrl}} />
      </View>
    </TouchableOpacity>
  );
};

export default ImageItem;

const styles = StyleSheet.create({
  imageContainer: {
    width: 120,
    height: 120,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    top: 4,
    right: 4,
  },
});
