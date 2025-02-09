import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import {useCallback, useEffect, useState} from 'react';
import AppleHealthKit from 'react-native-health';
import {
  calculateStats,
  convertGoogleFitToStepcountData,
  fillMissingDates,
} from '../lib/utils';
import {ActivityStats} from './useDailyActivityStats';
import {Platform} from 'react-native';
import GoogleFit, {BucketUnit, Scopes} from 'react-native-google-fit';

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
  refetch: () => void;
  isRefetching: boolean;
}

export const useActivityStats = ({
  startDate,
  endDate = new Date().toISOString(),
}: Props): Result => {
  const {userData} = useAuthStore();
  const [stepCountData, setStepCountData] = useState<StepCountData | undefined>(
    undefined,
  );
  const [totalSteps, setTotalSteps] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [isRefetching, setIsRefetching] = useState(false);
  const getSteps = async (
    startDate: string,
    endDate: string,
    isRefetch: boolean = false,
  ) => {
    if (isRefetch) {
      setIsRefetching(true);
    }
    if (Platform.OS === 'ios') {
      AppleHealthKit.getDailyStepCountSamples(
        {
          startDate: startDate as string,
          endDate,
        },
        (err, results) => {
          if (err) {
            setErrorMessage(`ios 특정기간 걸음수 데이터 가져오기 오류: ${err}`);
            return;
          }

          const totalStepsCount = Math.round(
            results.reduce((sum, item) => sum + item.value, 0),
          );
          setTotalSteps(totalStepsCount);

          const steps = results.reduce<Record<string, number>>((acc, item) => {
            const date = new Date(item.startDate);
            const formattedDate = `${
              date.getMonth() + 1
            }월 ${date.getDate()}일`;
            acc[formattedDate] = (acc[formattedDate] || 0) + item.value;
            return acc;
          }, {});

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
          setStepCountData(sortedSteps);
          if (isRefetch) {
            setIsRefetching(false);
          }
        },
      );
    } else {
      try {
        await GoogleFit.authorize({
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_LOCATION_READ,
          ],
        });
        const results = await GoogleFit.getDailyStepCountSamples({
          startDate,
          endDate,
          bucketUnit: BucketUnit.DAY,
          bucketInterval: 1,
        });
        const filledDatas = fillMissingDates(
          results[2].steps,
          startDate,
          endDate,
        );
        const totalStepsCount = Math.round(
          results[2].steps.reduce((sum, item) => sum + item.value, 0),
        );
        setTotalSteps(totalStepsCount);
        const stepcountData = convertGoogleFitToStepcountData(filledDatas);
        setStepCountData(stepcountData);
      } catch (error) {
        console.log('안드로이드 특정기간 걸음수 데이터 에러');
        // setErrorMessage('특정기간 걸음수 데이터 가져오기 오류');
      } finally {
        if (isRefetch) {
          setIsRefetching(false);
        }
      }
    }
  };

  useEffect(() => {
    getSteps(startDate, endDate);
  }, []);

  const refetch = useCallback(() => {
    getSteps(startDate, endDate, true);
  }, [startDate, endDate]);

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
    refetch,
    isRefetching,
  };
};
