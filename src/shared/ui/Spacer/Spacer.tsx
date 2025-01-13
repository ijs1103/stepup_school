import React from 'react';
import { View, ViewStyle } from 'react-native';

interface ISpacer {
  size: number;
  horizontal?: boolean;
}

export const Spacer: React.FC<ISpacer> = ({ size, horizontal = false }) => {
  const style: ViewStyle = horizontal
    ? { width: size, height: '100%' }
    : { height: size, width: '100%' };

  return <View style={style} />;
};

export default Spacer;