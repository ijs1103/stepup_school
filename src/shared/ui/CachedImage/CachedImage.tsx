import React from 'react';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {StyleProp} from 'react-native';

interface Props {
  uri: string | undefined;
  emptyImage?: React.ReactNode;
  style: StyleProp<ImageStyle>;
}

const CachedImage = ({uri, emptyImage, style}: Props) => {
  if (uri) {
    return (
      <FastImage
        style={style}
        source={{uri}}
        onError={() => {
          return console.log('CachedImage loading failed');
        }}
      />
    );
  } else {
    return emptyImage;
  }
};

export default CachedImage;
