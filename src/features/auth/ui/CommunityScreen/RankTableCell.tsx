import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Avatar from '@/shared/ui/Avatar/Avatar';
import {Spacer} from '@/shared/ui/Spacer';

const RankTableCell = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.rankText}>{'1'}</Text>
        <Spacer size={12} horizontal />
        <Avatar />
        <Spacer size={18} horizontal />
        <Text style={styles.nameText}>{'김가네'}</Text>
      </View>
      <Text style={styles.statsText}>{'13,554'}</Text>
    </View>
  );
};

export default RankTableCell;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '500',
    color: '#423D36',
  },
  nameText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 23,
    color: '#423D36',
  },
  statsText: {
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 17,
    color: '#C7BBAB',
  },
});
