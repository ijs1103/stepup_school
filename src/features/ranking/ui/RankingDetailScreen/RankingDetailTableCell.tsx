import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FirstPlaceMedal from '../../../../../assets/first_place_medal.svg';
import SecondPlaceMedal from '../../../../../assets/second_place_medal.svg';
import ThirdPlaceMedal from '../../../../../assets/third_place_medal.svg';

interface Props {
  rank: number;
  name: string;
  stat: string;
}

const RankingDetailTableCell = ({ rank, name, stat }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.hStack}>
        <View style={styles.rankContainer}>
          {rank === 1 && <FirstPlaceMedal />}
          {rank === 2 && <SecondPlaceMedal />}
          {rank === 3 && <ThirdPlaceMedal />}
          {rank >= 4 && <Text style={styles.rank}>{rank}</Text>}
        </View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.stat}>{stat}</Text>
    </View>
  );
}

export default RankingDetailTableCell;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  hStack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankContainer: {
    width: 24,
    alignItems: 'center',
    marginRight: 16,
  },
  rank: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '700',
    color: '#423836',
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    lineHeight: 25,
    fontWeight: '700',
    color: '#423836',
  },
  stat: {
    fontWeight: '500',
    lineHeight: 17,
    color: '#96867E',
  },
});

