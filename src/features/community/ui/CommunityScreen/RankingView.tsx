import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ChevronRight from '../../../../../assets/chevron_right.svg';
import {Spacer} from '@/shared/ui/Spacer';
import Avatar from '@/shared/ui/Avatar/Avatar';
import RankTableCell from './RankTableCell';

interface Props {
  navigateToRankingDetail: () => void;
  stepCountPressHandler: () => void;
  caloriesPressHandler: () => void;
  distancePressHandler: () => void;
}

const RankingView = ({
  navigateToRankingDetail,
  stepCountPressHandler,
  caloriesPressHandler,
  distancePressHandler,
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
      {/* TODO: 기존제작한 버튼뷰로 대체 */}
      <View style={{flexDirection: 'row', gap: 8}}>
        <TouchableOpacity onPress={stepCountPressHandler}>
          <Text>{'걸음수'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={caloriesPressHandler}>
          <Text>{'칼로리'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={distancePressHandler}>
          <Text>{'거리'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.rankTable}>
        {[1, 2, 3].map(item => (
          <RankTableCell key={item} />
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
  rankTable: {
    backgroundColor: '#fff',
    gap: 8,
    paddingHorizontal: 30,
    paddingVertical: 18,
  },
});
