import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import AppleHealthKit, {HealthInputOptions} from 'react-native-health';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {getTodayStartDate} from '@/shared/lib/date/getTodayStartDate';
import {readRecords} from 'react-native-health-connect';
import {getKoreaEndTime} from '@/shared/lib/date/getKoreaEndtime';

interface HealthValue {
  value: number;
  startDate: string;
  endDate: string;
  metadata?: RecordMetadata;
}

interface RecordMetadata {
  [key: string]: any;
}

export interface ActivityStats {
  distance: number; // 걸은 거리 (km)
  burnedCalories: number; // 소모 칼로리
  stepCount: number; // 걸음 수
  walkingTime: number; // 걸은 시간 (분)
}

interface Result {
  data: ActivityStats;
  refetch: () => void;
  isRefetching: boolean;
  errorMessage: string;
}

export const useDailyActivityStats = (): Result => {
  const {userData} = useAuthStore();
  const [dailyStepCount, setDailyStepCount] = useState(0);
  const [isRefetching, setIsRefetching] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const options = {
    startDate: getTodayStartDate(),
  } as HealthInputOptions;

  const getDailySteps = async (isRefetch: boolean = false) => {
    if (isRefetch) {
      setIsRefetching(true);
    }
    if (Platform.OS === 'ios') {
      return new Promise<number>((resolve, reject) => {
        AppleHealthKit.getStepCount(
          options,
          (err: string | null, results: HealthValue) => {
            if (err) {
              setErrorMessage(`일간 걸음수 데이터 가져오기 오류: ${err}`);
              reject(err);
            } else {
              console.log('걸음수데이터: ', results);
              setDailyStepCount(results.value);
              resolve(results.value);
            }
            if (isRefetch) {
              setIsRefetching(false);
            }
          },
        );
      });
    } else {
      try {
        const results = await readRecords('Steps', {
          timeRangeFilter: {
            operator: 'between',
            startTime: getTodayStartDate(),
            endTime: getKoreaEndTime(),
          },
        });
        console.log('안드결과', results);
        const totalSteps = results.records.reduce(
          (sum, cur) => sum + cur.count,
          0,
        );
        console.log('오늘의 총 걸음 수:', totalSteps);
        setDailyStepCount(totalSteps);
        if (isRefetch) {
          setIsRefetching(false);
        }
        return totalSteps;
      } catch (error) {
        console.log(error);
        setErrorMessage(`일간 걸음수 데이터 가져오기 오류: ${error}`);
        if (isRefetch) {
          setIsRefetching(false);
        }
        return 0;
      }
    }
  };

  useEffect(() => {
    getDailySteps();
  }, []);

  const calculateStats = (steps: number): ActivityStats => {
    if (!userData) {
      return {
        distance: 0,
        burnedCalories: 0,
        stepCount: 0,
        walkingTime: 0,
      };
    }
    return {
      stepCount: steps,
      burnedCalories: Number(
        ((userData.gender ? 0.055 : 0.045) * steps).toFixed(1),
      ),
      distance: Math.round(((userData.gender ? 7.7 : 6.7) * steps) / 100) / 100,
      walkingTime: Math.round((0.62 * steps) / 60),
    };
  };

  return {
    data: calculateStats(dailyStepCount),
    refetch: () => getDailySteps(true),
    isRefetching,
    errorMessage,
  };
};
