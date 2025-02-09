import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';

interface MutationVariables {
  password: string;
}
interface AxiosFnVariables extends MutationVariables {
  accessToken: string;
}
interface VerifyPassword {
  valid: boolean;
}

const axiosFn = async ({
  accessToken,
  password,
}: AxiosFnVariables): Promise<VerifyPassword> => {
  try {
    const response = await axios.post<VerifyPassword>(
      `${BASE_URL}/user/verify`,
      {password},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`useVerifyPassword 에러 - ${error}`);
    throw new CustomError('비밀번호 검증 에러가 발생.');
  }
};

export const useVerifyPassword = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<VerifyPassword, CustomError, MutationVariables>({
    mutationFn: ({password}) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return axiosFn({accessToken, password});
    },
  });
};
