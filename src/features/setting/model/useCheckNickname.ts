import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';

interface AxiosFnVariables {
  nickname: string;
}
interface CheckNickname {
  available: boolean;
}

const axiosFn = async ({
  nickname,
}: AxiosFnVariables): Promise<CheckNickname> => {
  try {
    const response = await axios.post<CheckNickname>(
      `${BASE_URL}/user/check-nickname`,
      {nickname},
    );
    return response.data;
  } catch (error) {
    console.log(`useCheckNickname 에러 - ${error}`);
    throw new CustomError('닉네임 검증 에러가 발생.');
  }
};

export const useCheckNickname = () => {
  return useMutation<CheckNickname, CustomError, AxiosFnVariables>({
    mutationFn: ({nickname}) => {
      return axiosFn({nickname});
    },
  });
};
