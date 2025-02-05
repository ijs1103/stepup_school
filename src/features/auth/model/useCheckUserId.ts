import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';

interface AxiosFnVariables {
  userId: string;
}
interface CheckUserId {
  available: boolean;
}

const axiosFn = async ({userId}: AxiosFnVariables): Promise<CheckUserId> => {
  try {
    const response = await axios.post<CheckUserId>(
      `${BASE_URL}/user/check-userId`,
      {userId},
    );
    return response.data;
  } catch (error) {
    console.log(`useCheckUserId 에러 - ${error}`);
    throw new CustomError('아이디 검증 에러가 발생.');
  }
};

export const useCheckUserId = () => {
  return useMutation<CheckUserId, CustomError, AxiosFnVariables>({
    mutationFn: ({userId}) => {
      return axiosFn({userId});
    },
  });
};
