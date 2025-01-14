import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {useEffect, useState} from 'react';
import AppleHealthKit from 'react-native-health';
import {calculateStats} from '../lib/utils';
import {ActivityStats} from './useDailyActivityStats';
import {Platform} from 'react-native';
import {readRecords} from 'react-native-health-connect';
import {getKoreaEndTime} from '@/shared/lib/date/getKoreaEndtime';

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
  const getWeeklySteps = async () => {
    if (Platform.OS === 'ios') {
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
            const formattedDate = `${
              date.getMonth() + 1
            }월 ${date.getDate()}일`;
            acc[formattedDate] = (acc[formattedDate] || 0) + item.value;
            return acc;
          },
          {},
        );

        // 날짜를 오름차순으로 정렬하는 함수
        const sortByDate = (a: string, b: string) => {
          const [aMonth, aDay] = a
            .replace('월', '')
            .replace('일', '')
            .split(' ')
            .map(Number);
          const [bMonth, bDay] = b
            .replace('월', '')
            .replace('일', '')
            .split(' ')
            .map(Number);

          if (aMonth !== bMonth) {
            return aMonth - bMonth;
          }
          return aDay - bDay;
        };

        // 정렬된 weeklySteps 객체 생성
        const sortedWeeklySteps = Object.fromEntries(
          Object.entries(weeklySteps).sort(([a], [b]) => sortByDate(a, b)),
        );
        console.log('일별 걸음 수:', sortedWeeklySteps);
        setWeeklyStepCountData(sortedWeeklySteps);
      });
    } else {
      try {
        const results = await readRecords('Steps', {
          timeRangeFilter: {
            operator: 'between',
            startTime: startDate,
            endTime: getKoreaEndTime(),
          },
        });
        console.log('일별 걸음 수:', results);
        // setWeeklyStepCountData(weeklySteps);
      } catch (error) {
        console.log(error);
        setErrorMessage(`주간 걸음수 데이터 가져오기 오류: ${error}`);
      }
    }
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
