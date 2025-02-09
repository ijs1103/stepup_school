import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {useQuery} from '@tanstack/react-query';
import {CustomError} from '@/shared/lib/\bCustomError';
import {getTodayDate} from '@/shared/lib/date/getTodayDate';
import {ActivityStats} from '@/features/walking/\bmodel/useDailyActivityStats';
import {calculateStats} from '@/features/walking/lib/utils';

interface ClassRankingDTO {
  userId: string;
  date: string;
}

interface ClassRanking {
  class: {
    grade: number;
    class_number: number;
  };
  walk: number;
}

export interface ParsedClassRanking extends ActivityStats {
  className: string;
}

const queryFn = async (
  requestBody: ClassRankingDTO,
): Promise<ClassRanking[]> => {
  try {
    const response = await axios.post<ClassRanking[]>(
      `${BASE_URL}/walk/classranking`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.warn('/walk/classranking', error);
    throw new CustomError('통합 랭킹 조회에 실패하였습니다.');
  }
};

export const useClassRanking = () => {
  const {userData} = useAuthStore();
  const todayDate = getTodayDate();
  const query = useQuery<ClassRanking[], Error, ParsedClassRanking[]>({
    queryKey: ['ClassRanking', `${userData?.userId}-${todayDate}`],
    queryFn: () => {
      if (!userData) {
        throw new Error('인증 토큰이 없습니다.');
      }
      return queryFn({
        userId: userData.userId,
        date: todayDate,
      });
    },
    retry: false,
    enabled: !!userData?.userId,
    staleTime: 5 * 60 * 1000,
    select: (data): ParsedClassRanking[] => {
      return data.map(item => ({
        className: `${item.class.grade}-${item.class.class_number}`,
        ...calculateStats(userData?.gender ?? true, item.walk),
      }));
    },
  });
  return query;
};
