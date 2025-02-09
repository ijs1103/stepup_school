import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import AppleHealthKit, {HealthInputOptions} from 'react-native-health';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import {getTodayStartDate} from '@/shared/lib/date/getTodayStartDate';
import GoogleFit, {Scopes} from 'react-native-google-fit';

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
              setErrorMessage(`ios 일간 걸음수 데이터 가져오기 오류: ${err}`);
              reject(err);
            } else {
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
        await GoogleFit.authorize({
          scopes: [
            Scopes.FITNESS_ACTIVITY_READ,
            Scopes.FITNESS_BODY_READ,
            Scopes.FITNESS_LOCATION_READ,
          ],
        });
        const results = await GoogleFit.getDailySteps(
          getTodayStartDate() as Date,
        );
        const stepCount = results[2].steps[0].value;
        setDailyStepCount(stepCount);
      } catch (error) {
        console.log('안드로이드 일간 걸음수 데이터 에러');
        // setErrorMessage('일간 걸음수 데이터 가져오기 오류');
        setDailyStepCount(0);
      } finally {
        if (isRefetch) {
          setIsRefetching(false);
        }
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
