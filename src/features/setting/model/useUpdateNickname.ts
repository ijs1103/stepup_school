import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';

interface MutationVariables {
  nickname: string;
}
interface AxiosFnVariables extends MutationVariables {
  accessToken: string;
}
interface User {
  id: number;
  userId: string;
  name: string;
  nickname: string;
  password_hash: string;
  school_name: string;
  classId: number;
  grade: number;
  gender: boolean;
  height: number;
  weight: number;
  birth_date: string;
  updated_at: string;
  created_at: string;
  profile_img: string;
  donatable_walk: number;
}

const axiosFn = async ({
  accessToken,
  nickname,
}: AxiosFnVariables): Promise<User> => {
  try {
    const response = await axios.patch<User>(
      `${BASE_URL}/user/nickname`,
      {nickname},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`useUpdateNickname 에러 - ${error}`);
    throw new CustomError('닉네임 업데이트 에러가 발생.');
  }
};

export const useUpdateNickname = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<User, CustomError, MutationVariables>({
    mutationFn: ({nickname}) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return axiosFn({accessToken, nickname});
    },
  });
};
