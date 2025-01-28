import {FOOD_ITEM_LIST, FoodItem} from '@/shared/constants';
import {ActivityStats} from '../\bmodel/useDailyActivityStats';
import {StepCountData} from '../\bmodel/useActivityStats';

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

interface DateValue {
  date: string;
  value: number;
}

export const convertGoogleFitToStepcountData = (
  input: DateValue[],
): StepCountData => {
  return input.reduce((acc, {date, value}) => {
    const [year, month, day] = date.split('-');
    const formattedDate = `${parseInt(month)}월 ${parseInt(day)}일`;
    return {...acc, [formattedDate]: value};
  }, {});
};

export const fillMissingDates = (
  steps: DateValue[],
  startDateIso: string,
  endDateIso: string,
): DateValue[] => {
  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const koreaDate = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    return koreaDate.toISOString().split('T')[0];
  };

  const startDate = formatDate(startDateIso);
  const endDate = formatDate(endDateIso);

  const generateDateRange = (start: string, end: string): string[] => {
    const dates: string[] = [];
    const current = new Date(start);
    const last = new Date(end);

    while (current <= last) {
      dates.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const stepsMap = new Map(steps.map(item => [item.date, item.value]));

  return generateDateRange(startDate, endDate).map(date => ({
    date,
    value: stepsMap.get(date) || 0,
  }));
};
