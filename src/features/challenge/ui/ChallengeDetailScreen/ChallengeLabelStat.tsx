import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface Props {
  label: string;
  stat: string;
  isEmphaszied?: boolean;
}

const ChallengeLabelStat = ({label, stat, isEmphaszied}: Props) => {
  return (
    <View style={styles.hStack}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={[styles.stat, {color: isEmphaszied ? '#FB970C' : '#968C7E'}]}>
        {stat}
      </Text>
    </View>
  );
};

export default ChallengeLabelStat;

const styles = StyleSheet.create({
  hStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 24,
    color: '#423836',
  },
  stat: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 24,
  },
});
