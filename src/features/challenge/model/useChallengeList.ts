import {it} from '@jest/globals';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {getTodayFormatDate} from '@/shared/lib/date/getTodayFormatDate';

interface AxiosFnVariables {
  accessToken: string;
}

interface Challenge {
  id: number;
  type: 1 | 2 | 3;
  school_name: string;
  title: string;
  content: string;
  goal_steps: number;
  current_steps: number;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  photoUrl: string;
  valid: 'valid' | 'not valid-date' | 'not valid- step';
  personalSteps: number;
}

export interface ParsedChallenge {
  challengeId: number;
  type: '걸음' | '칼로리' | '거리';
  schoolName: string;
  title: string;
  content: string;
  goalStat: number;
  currentStat: number;
  duration: string;
  endDate: string;
  imageUrl: string;
  isDone: boolean;
  personalStat: number;
}

const axiosFn = async ({
  accessToken,
}: AxiosFnVariables): Promise<Challenge[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/challenge`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn(`useChallengeList 에러 - ${error}`);
    throw new CustomError('챌린지리스트 조회에 에러가 발생.');
  }
};

export const useChallengeList = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  const query = useQuery<Challenge[], CustomError, ParsedChallenge[]>({
    queryKey: ['ChallengeList'],
    queryFn: () => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return axiosFn({accessToken});
    },
    retry: false,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    select: (data): ParsedChallenge[] => {
      return data.map(item => ({
        challengeId: item.id,
        type: (item.type === 1) ? '걸음' : (item.type === 2) ? '칼로리' : '거리',
        schoolName: item.school_name,
        title: item.title,
        content: item.content,
        goalStat: item.goal_steps,
        currentStat: item.current_steps,
        duration: `${item.start_date}-${item.end_date}`,
        endDate: item.end_date,
        imageUrl: item.photoUrl,
        isDone: item.valid !== 'valid',
        personalStat: item.personalSteps,
      }));
    },
  });

  return query;
};
