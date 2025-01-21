import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {calculateStats} from '../lib/utils';
import {ActivityStats} from './useDailyActivityStats';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {useQuery} from '@tanstack/react-query';
import {CustomError} from '@/shared/lib/\bCustomError';
import {DailyWalkingStats} from '@/shared/ui/WeeklyChart/WeeklyChart';
import {formatDateToKorean} from '@/shared/lib/date/formatDateToKorean';
interface ClassStatsDTO {
  userId: string;
  start_date: string;
  end_date: string;
}

interface ClassStats {
  date: string;
  walk: number;
}

// interface ProcessedClassStats {
//   stepCountData: ClassStats[];
//   activityStats: ActivityStats;
// }

interface ProcessedClassStats {
  stepCountData: DailyWalkingStats[];
  activityStats: ActivityStats;
}

const queryFn = async (requestBody: ClassStatsDTO): Promise<ClassStats[]> => {
  try {
    const response = await axios.post<ClassStats[]>(
      `${BASE_URL}/walk/classstats`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.warn('/walk/classstats', error);
    throw new CustomError('주간 반걸음수 조회에 실패하였습니다.');
  }
};

interface Props {
  startDate: string;
  endDate: string;
}

export const useActivityStatsForOurClass = ({startDate, endDate}: Props) => {
  const {userData} = useAuthStore();
  const query = useQuery<ClassStats[], Error, ProcessedClassStats>({
    queryKey: ['classStats', `${userData?.userId}-${startDate}-${endDate}`],
    queryFn: () => {
      if (!userData) {
        throw new Error('인증 토큰이 없습니다.');
      }
      return queryFn({
        userId: userData.userId,
        start_date: startDate,
        end_date: endDate,
      });
    },
    retry: false,
    enabled: !!userData?.userId,
    staleTime: 5 * 60 * 1000,
    select: (data): ProcessedClassStats => {
      const totalSteps = data.reduce((sum, item) => sum + item.walk, 0);
      console.log('totalSteps', totalSteps, 'data', data);
      return {
        stepCountData: data.map(item => {
          return {
            date: formatDateToKorean(item.date),
            ...calculateStats(userData?.gender ?? true, item.walk),
          };
        }),
        activityStats: calculateStats(userData?.gender ?? true, totalSteps),
      };
    },
  });
  return query;
};
