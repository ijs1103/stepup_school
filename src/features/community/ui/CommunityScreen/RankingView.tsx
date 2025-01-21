import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import ChevronRight from '../../../../../assets/chevron_right.svg';
import { Spacer } from '@/shared/ui/Spacer';
import RankTableCell from './RankTableCell';
import { ActivityStatsBar } from '@/shared/ui/ActivityStatsBar';
import { ChartCategory } from '@/shared/ui/WeeklyChart/WeeklyChart';
import { ParsedPersonalRanking } from '@/features/ranking/model/usePersonalRanking';

interface Props {
  data: ParsedPersonalRanking[];
  navigateToRankingDetail: () => void;
  currentCategory: ChartCategory;
  categorySelectHandler: (category: ChartCategory) => void;
}

const RankingView = ({
  data,
  navigateToRankingDetail,
  currentCategory,
  categorySelectHandler,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.hStack}>
        <Text style={styles.title}>{'랭킹'}</Text>
        <TouchableOpacity onPress={navigateToRankingDetail}>
          <ChevronRight />
        </TouchableOpacity>
      </View>
      <Spacer size={16} />
      <View style={styles.activityStatsBarContainer}>
        <ActivityStatsBar color={'#FB970C'} pressHandler={categorySelectHandler} />
      </View>
      <View style={styles.rankTable}>
        {data.map((item, index) => (
          <RankTableCell key={index} rank={index + 1} imageUrl={item.avatarUrl} name={item.userName} stat={item[currentCategory]} />
        ))}
      </View>
    </View>
  );
};

export default RankingView;

const styles = StyleSheet.create({
  container: {},
  hStack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: '#423D36',
  },
  activityStatsBarContainer: {
    paddingLeft: 28,
    paddingBottom: 12,
  },
  rankTable: {
    backgroundColor: '#fff',
    gap: 8,
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
});
