import {FOOD_ITEM_LIST, FoodItem} from '@/shared/constants';
import {ActivityStats} from '../\bmodel/useDailyActivityStats';

export const matchFoodByCalories = (calories: number): FoodItem => {
  const sortedFoods = [...FOOD_ITEM_LIST].sort(
    (a, b) => b.calories - a.calories,
  );
  for (let food of sortedFoods) {
    if (calories >= food.calories) {
      return food;
    }
  }
  return {name: '해당 없음', calories: 0, emoji: ''};
};

export interface TargetActivityData {
  targetCalories: number;
  leftCalories: number;
  targetDistance: number;
  leftDistance: number;
}

export const matchTargetActivityData = (
  gender: boolean,
  targetStepCount: number | string,
  burnedCalories: number,
  walkedDistance: number,
): TargetActivityData => {
  const validTargetStepCount = Number(String(targetStepCount).replace(',', ''));
  const validBurnedCalories = Number(burnedCalories);
  const validWalkedDistance = Number(walkedDistance);

  if (
    isNaN(validTargetStepCount) ||
    isNaN(validBurnedCalories) ||
    isNaN(validWalkedDistance)
  ) {
    console.error('Invalid input values');
    return {
      targetCalories: 0,
      leftCalories: 0,
      targetDistance: 0,
      leftDistance: 0,
    };
  }

  const targetCalories = Number(
    ((gender ? 0.055 : 0.045) * validTargetStepCount).toFixed(1),
  );

  const leftCalories = Number(
    (targetCalories - validBurnedCalories).toFixed(1),
  );

  const targetDistance =
    Math.round(((gender ? 7.7 : 6.7) * validTargetStepCount) / 100) / 100;

  const leftDistance = Number(
    (targetDistance - validWalkedDistance).toFixed(2),
  );

  return {
    targetCalories,
    leftCalories,
    targetDistance,
    leftDistance,
  };
};

export const calculateStats = (
  gender: boolean,
  steps: number,
): ActivityStats => {
  return {
    stepCount: steps,
    burnedCalories: Number(((gender ? 0.055 : 0.045) * steps).toFixed(1)),
    distance: Math.round(((gender ? 7.7 : 6.7) * steps) / 100) / 100,
    walkingTime: Math.round((0.62 * steps) / 60),
  };
};
