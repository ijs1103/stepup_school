import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {useEffect, useState} from 'react';
import AppleHealthKit from 'react-native-health';
import {calculateStats} from '../lib/utils';
import { ActivityStats } from './useDailyActivityStats';

interface WeekOptions {
  startDate: string;
  endDate?: string;
}

export interface WeeklyStepCountData {
  [key: string]: number;
}

interface Result {
  weeklyStepCountData: WeeklyStepCountData | undefined;
  WeeklyActivityStats: ActivityStats;
  errorMessage: string;
}

export const useWeeklyActivityStats = ({
  startDate,
  endDate = new Date().toISOString(),
}: WeekOptions): Result => {
  const {userData} = useAuthStore();
  const [weeklyStepCountData, setWeeklyStepCountData] = useState<
    WeeklyStepCountData | undefined
  >(undefined);
  const [totalSteps, setTotalSteps] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const options = {
    startDate,
    endDate,
  };

  const getWeeklySteps = () => {
    AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
      if (err) {
        setErrorMessage(`주간 걸음수 데이터 가져오기 오류: ${err}`);
        return;
      }

      const totalStepsCount = Math.round(
        results.reduce((sum, item) => sum + item.value, 0),
      );
      setTotalSteps(totalStepsCount);
      console.log('주간 총 걸음 수:', Math.round(totalStepsCount));

      const weeklySteps = results.reduce<Record<string, number>>(
        (acc, item) => {
          const date = new Date(item.startDate);
          const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일`;
          acc[formattedDate] = (acc[formattedDate] || 0) + item.value;
          return acc;
        },
        {},
      );
      console.log('일별 걸음 수:', weeklySteps);
      setWeeklyStepCountData(weeklySteps);
    });
  };

  useEffect(() => {
    getWeeklySteps();
  }, []);

  return {
    weeklyStepCountData,
    WeeklyActivityStats: userData
      ? calculateStats(userData.gender, totalSteps)
      : {
          distance: 0,
          burnedCalories: 0,
          stepCount: 0,
          walkingTime: 0,
        },
    errorMessage,
  };
};
