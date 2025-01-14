import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {useEffect, useState} from 'react';
import AppleHealthKit from 'react-native-health';
import {calculateStats} from '../lib/utils';
import {ActivityStats} from './useDailyActivityStats';
import {Platform} from 'react-native';
import {readRecords} from 'react-native-health-connect';
import {getKoreaEndTime} from '@/shared/lib/date/getKoreaEndtime';

interface Props {
  startDate: string;
  endDate?: string;
}

export interface StepCountData {
  [key: string]: number;
}

interface Result {
  stepCountData: StepCountData | undefined;
  activityStats: ActivityStats;
  errorMessage: string;
}

export const useActivityStats = ({
  startDate,
  endDate = new Date().toISOString(),
}: Props): Result => {
  const {userData} = useAuthStore();
  const [stepCountData, setStepCountData] = useState<
  StepCountData | undefined
  >(undefined);
  const [totalSteps, setTotalSteps] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const options = {
    startDate,
    endDate,
  };
  const getSteps = async () => {
    if (Platform.OS === 'ios') {
      AppleHealthKit.getDailyStepCountSamples(options, (err, results) => {
        if (err) {
          setErrorMessage(`특정기간 걸음수 데이터 가져오기 오류: ${err}`);
          return;
        }

        const totalStepsCount = Math.round(
          results.reduce((sum, item) => sum + item.value, 0),
        );
        setTotalSteps(totalStepsCount);
        console.log('총 걸음 수:', Math.round(totalStepsCount));

        const steps = results.reduce<Record<string, number>>(
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

        const sortedSteps = Object.fromEntries(
          Object.entries(steps).sort(([a], [b]) => sortByDate(a, b)),
        );
        console.log('걸음 수:', sortedSteps);
        setStepCountData(sortedSteps);
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
        console.log('걸음 수:', results);
        // setWeeklyStepCountData(weeklySteps);
      } catch (error) {
        console.log(error);
        setErrorMessage(`특정기간 걸음수 데이터 가져오기 오류: ${error}`);
      }
    }
  };

  useEffect(() => {
    getSteps();
  }, []);

  return {
    stepCountData,
    activityStats: userData
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
