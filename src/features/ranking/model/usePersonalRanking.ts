import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {useQuery} from '@tanstack/react-query';
import {CustomError} from '@/shared/lib/\bCustomError';
import {getTodayDate} from '@/shared/lib/date/getTodayDate';
import {calculateStats} from '@/features/walking/lib/utils';
import {ActivityStats} from '@/features/walking/\bmodel/useDailyActivityStats';

interface PersonalRankingDTO {
  userId: string;
  date: string;
}

export interface PersonalRanking {
  user: {
    name: string;
    profile_img: string;
  };
  steps: number;
}

export interface ParsedPersonalRanking extends ActivityStats {
  userName: string;
  avatarUrl: string;
}

const queryFn = async (
  requestBody: PersonalRankingDTO,
): Promise<PersonalRanking[]> => {
  try {
    const response = await axios.post<PersonalRanking[]>(
      `${BASE_URL}/walk/personalranking`,
      requestBody,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.warn('/walk/personalranking', error);
    throw new CustomError('우리반 랭킹 조회에 실패하였습니다.');
  }
};

export const usePersonalRanking = () => {
  const {userData} = useAuthStore();
  const todayDate = getTodayDate();
  const query = useQuery<PersonalRanking[], Error, ParsedPersonalRanking[]>({
    queryKey: ['PersonalRanking', `${userData?.userId}-${todayDate}`],
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
    select: (data): ParsedPersonalRanking[] => {
      return data.map(item => ({
        userName: item.user.name,
        avatarUrl: item.user.profile_img,
        ...calculateStats(userData?.gender ?? true, item.steps),
      }));
    },
  });
  return query;
};
