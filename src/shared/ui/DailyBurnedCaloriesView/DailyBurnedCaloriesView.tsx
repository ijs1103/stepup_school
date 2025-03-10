import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CarIcon from '../../../../assets/car.svg';
import {FoodItem} from '@/shared/constants';
import {TargetActivityData} from '@/features/walking/lib/utils';
import {Spacer} from '../Spacer';

interface Props {
  food: FoodItem;
  targetActivityData: TargetActivityData;
  isWeekly?: boolean;
}

const DailyBurnedCaloriesView = ({
  food,
  targetActivityData,
  isWeekly = false,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.burnedFoodContainer}>
        <Text style={styles.emoji}>{food.emoji}</Text>
        <Text style={styles.burnedFoodText}>
          {`${isWeekly ? '이번주' : '오늘'} 총\n`}
          <Text style={styles.boldText}>{food.name}</Text>
          {'를(을)\n불태웠어요'}
        </Text>
        <Text style={styles.foodCalorieText}>{`약 ${food.calories}kcal`}</Text>
      </View>
      <View style={styles.burnedCalorie}>
        <View>
          <CarIcon />
          <Text style={styles.burnedCalorieText}>
            {targetActivityData.targetCalories}
            <Text style={styles.unitText}>{' Kcal'}</Text>
          </Text>
        </View>
        <Text
          style={
            styles.targetCalorieText
          }>{`앞으로\n${targetActivityData.leftCalories}Kcal`}</Text>
      </View>
      <View style={styles.walkedDistance}>
        <View>
          <CarIcon />
          <Text style={styles.burnedCalorieText}>
            {targetActivityData.targetDistance}
            <Text style={styles.unitText}>{' km'}</Text>
          </Text>
        </View>
        <Text
          style={
            styles.targetCalorieText
          }>{`앞으로\n${targetActivityData.leftDistance}km`}</Text>
      </View>
    </View>
  );
};

export default DailyBurnedCaloriesView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  burnedFoodContainer: {
    backgroundColor: '#FDB44F',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  emoji: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 4,
  },
  burnedFoodText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 14,
  },
  foodCalorieText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '500',
    lineHeight: 24,
  },
  boldText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  burnedCalorie: {
    paddingTop: 12,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderTopWidth: 4,
    borderTopColor: '#968C7E',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
  burnedCalorieText: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
    color: '#141210',
  },
  unitText: {
    fontWeight: '700',
    fontSize: 12,
    lineHeight: 16,
    color: '#141210',
  },
  targetCalorieText: {
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 14,
    color: '#111111',
  },
  walkedDistance: {
    paddingTop: 12,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    borderTopWidth: 4,
    borderTopColor: '#968C7E',
    paddingHorizontal: 8,
    justifyContent: 'space-between',
  },
});
