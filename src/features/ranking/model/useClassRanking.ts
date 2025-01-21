import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {useQuery} from '@tanstack/react-query';
import {CustomError} from '@/shared/lib/\bCustomError';
import {getTodayDate} from '@/shared/lib/date/getTodayDate';

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
  const query = useQuery<ClassRanking[], Error>({
    queryKey: ['ClassRanking', `${userData?.userId}-`],
    queryFn: () => {
      if (!userData) {
        throw new Error('인증 토큰이 없습니다.');
      }
      return queryFn({
        userId: userData.userId,
        date: getTodayDate(),
      });
    },
    retry: false,
    enabled: !!userData?.userId,
    staleTime: 5 * 60 * 1000,
  });
  return query;
};
