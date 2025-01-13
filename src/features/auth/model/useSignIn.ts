import {useMutation} from '@tanstack/react-query';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {AxiosError} from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';

export interface SignInDTO {
  userId: string;
  password: string;
}

export interface SignInResponse {
  userId: string;
  gender: boolean;
  access_token: string;
  refresh_token: string;
}

const mutationFn = async (data: SignInDTO): Promise<SignInResponse> => {
  try {
    const response = await axios.post<SignInResponse>(
      `${BASE_URL}/auth/login`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      switch (statusCode) {
        case 400:
          throw new CustomError(
            '아이디 또는 비밀번호가 잘못되었습니다.',
            statusCode,
          );
        default:
          throw new CustomError('알 수 없는 오류가 발생했습니다.', statusCode);
      }
    } else {
      throw new CustomError('네트워크 오류가 발생했습니다.');
    }
  }
};

export const useSignIn = () => {
  return useMutation<SignInResponse, CustomError, SignInDTO>({
    mutationFn,
    onError: error => {
      console.log(error);
    },
  });
};
