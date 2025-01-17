import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/fontawesome';
import {CachedImage} from '@/shared/ui/CachedImage';

interface Props {
  imageUrl: string;
  imageCloseHandler: () => void;
}

export const ImageUploadingItem = ({
  imageUrl,
  imageCloseHandler,
}: Props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        <CachedImage style={styles.image} uri={imageUrl} />
      </View>
      <TouchableOpacity style={styles.icon} onPress={imageCloseHandler}>
        <Icon name={'window-close'} size={24} color={'#000'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  imageContainer: {
    borderRadius: 8,
    width: 100,
    height: 100,
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
