import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  total: number;
  now: number;
  outerColor?: string;
}

const ProgressBar = ({total, now, outerColor = '#fff'}: Props) => {
  const progress = Math.max(0, Math.min(now, total)) / total;

  return (
    <View style={[styles.outer, {backgroundColor: outerColor}]}>
      <View
        style={[
          styles.inner,
          {
            width: `${progress * 100}%`,
            borderRadius: progress === 1 ? 10 : undefined,
          },
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  outer: {
    height: 17,
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
  },
  inner: {
    height: '100%',
    backgroundColor: '#FDB44F',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
