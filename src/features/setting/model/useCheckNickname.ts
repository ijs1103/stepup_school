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
interface VerifyPassword {
  available: boolean;
}

const axiosFn = async ({
  accessToken,
  nickname,
}: AxiosFnVariables): Promise<VerifyPassword> => {
  try {
    const response = await axios.post<VerifyPassword>(
      `${BASE_URL}/user/check-nickname`,
      {nickname},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`useCheckNickname 에러 - ${error}`);
    throw new CustomError('닉네임 검증 에러가 발생.');
  }
};

export const useCheckNickname = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<VerifyPassword, CustomError, MutationVariables>({
    mutationFn: ({nickname}) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return axiosFn({accessToken, nickname});
    },
  });
};
