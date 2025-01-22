import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';

interface School {
  name: string;
  created_at: string;
  updated_at: string;
  school_type: number;
}

interface Class {
  id: number;
  school_name: string;
  grade: number;
  class_number: number;
  name: string;
  avg_walk: number;
  total_walk: number;
  total_distance: number;
  total_calorie: number;
  start_date: string;
  year: number;
}

interface User {
  id: number;
  userId: string;
  name: string;
  weight: number;
  height: number;
  nickname: string;
  profile_img: string;
  school: School;
  grade: number;
  class: Class;
}

const queryFn = async (accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn(`useUser 에러 - ${error}`);
    throw new CustomError('내 정보 조회에 에러가 발생하였습니다.');
  }
};

export const useUser = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  console.log('accessToken', accessToken);
  return useQuery<User, Error>({
    queryKey: ['/user/me', accessToken],
    queryFn: () => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return queryFn(accessToken);
    },
    retry: false,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
  });
};
