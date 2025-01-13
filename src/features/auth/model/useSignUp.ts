import {useMutation} from '@tanstack/react-query';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {AxiosError} from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';

export interface SignUpDTO {
  userId: string;
  name: string;
  nickname: string;
  password: string;
  school_name: string;
  grade: number;
  class: number;
  gender: boolean;
  height: number;
  weight: number;
  birth_date: string;
}

export interface SignUpResponse {
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

const mutationFn = async (data: SignUpDTO): Promise<SignUpResponse> => {
  try {
    const response = await axios.post<SignUpResponse>(
      `${BASE_URL}/auth/signup`,
      data,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const errorMessage = error.response?.data.message;

      switch (statusCode) {
        case 400:
          if (errorMessage.includes('사용자 아이디')) {
            throw new CustomError(
              '이미 존재하는 사용자 아이디입니다.',
              statusCode,
            );
          } else if (errorMessage.includes('닉네임')) {
            throw new CustomError('이미 존재하는 닉네임입니다.', statusCode);
          }
          break;
        case 404:
          throw new CustomError('유효하지 않은 학급입니다.', statusCode);
        default:
          throw new CustomError('알 수 없는 오류가 발생했습니다.', statusCode);
      }
    } else {
      throw new CustomError('네트워크 오류가 발생했습니다.');
    }
  }
  return Promise.reject(new CustomError('예기치 않은 오류가 발생했습니다.'));
};

export const useSignUp = () => {
  return useMutation<SignUpResponse, CustomError, SignUpDTO>({
    mutationFn,
    onError: error => {
      console.log(error);
    },
  });
};
