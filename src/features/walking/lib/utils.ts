import {FOOD_ITEM_LIST, FoodItem} from '@/shared/constants';
import { ActivityStats } from '../\bmodel/useDailyActivityStats';

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
  targetStepCount: number,
  burnedCalories: number,
  walkedDistance: number,
): TargetActivityData => {
  const targetCalories = Number(
    ((gender ? 0.055 : 0.045) * targetStepCount).toFixed(1),
  );
  const leftCalories = Number((targetCalories - burnedCalories).toFixed(1));
  const targetDistance =
    Math.round(((gender ? 0.77 : 0.67) * targetStepCount) / 100) / 100;
  const leftDistance = Number((targetDistance - walkedDistance).toFixed(2));
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
    distance: Math.round(((gender ? 0.77 : 0.67) * steps) / 100) / 100,
    walkingTime: Math.round((0.62 * steps) / 60),
  };
};
