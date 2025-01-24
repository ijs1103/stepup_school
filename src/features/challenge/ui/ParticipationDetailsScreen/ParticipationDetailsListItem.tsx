import {ProgressBar} from '@/shared/ui/ProgressBar';
import {Spacer} from '@/shared/ui/Spacer';
import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';

interface Props {}

const ParticipationDetailsListItem = ({}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'하루만보 챌린지'}</Text>
      <Text style={styles.date}>{'2024.11.11'}</Text>
      <Text style={styles.totalStat}>
        <Text style={styles.currentStat}>{'3,444'}</Text>
        {' / 10,000 걸음'}
      </Text>
      <Spacer size={10} />
      <ProgressBar total={3444} now={15000} />
    </View>
  );
};

export default ParticipationDetailsListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F0EF',
    borderRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#423D36',
  },
  date: {
    fontWeight: '500',
    fontSize: 10,
    lineHeight: 24,
    color: '#968C7E',
  },
  currentStat: {
    fontWeight: '700',
    lineHeight: 14,
    fontSize: 12,
    color: '#141210',
  },
  totalStat: {
    textAlign: 'right',
    fontWeight: '500',
    lineHeight: 14,
    fontSize: 10,
    color: '#423D36',
  },
});
