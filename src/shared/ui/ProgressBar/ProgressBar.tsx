import React from 'react';
import {StyleSheet, View} from 'react-native';

interface Props {
  total: number | string;
  now: number | string;
  outerColor?: string;
}

const ProgressBar = ({total, now, outerColor = '#fff'}: Props) => {
  const parseValue = (value: number | string): number => {
    if (typeof value === 'string') {
      return parseFloat(value.replace(/,/g, ''));
    }
    return value;
  };
  const totalValue = parseValue(total);
  const nowValue = parseValue(now);
  const progress =
    totalValue > 0
      ? Math.max(0, Math.min(nowValue, totalValue)) / totalValue
      : 0;

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
