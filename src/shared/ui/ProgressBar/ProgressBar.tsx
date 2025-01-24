import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  total: number;
  now: number;
  outerColor?: string;
}

const ProgressBar = ({total, now, outerColor = '#fff'}: Props) => {
  const progress = Math.max(0, Math.min(now, total)) / total;
  const progressWidth = progress * 100;

  return (
    <View style={[styles.outer, {backgroundColor: outerColor}]}>
      <View style={[styles.inner, {width: progressWidth}]} />
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
