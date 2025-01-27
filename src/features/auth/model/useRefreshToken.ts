import {useMutation} from '@tanstack/react-query';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {AxiosError} from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';

export interface RefreshTokenDTO {
  refresh_token: string;
}

interface RefreshTokenResponse {
  access_token: string;
}

const mutationFn = async (
  data: RefreshTokenDTO,
): Promise<RefreshTokenResponse> => {
  try {
    const response = await axios.post<RefreshTokenResponse>(
      `${BASE_URL}/auth/refresh`,
      data,
    );
    return response.data;
  } catch (error) {
    console.log(`useRefreshToken 에러 - ${error}`);
    throw new CustomError('토큰재발급 중 에러가 발생하였습니다.');
  }
};

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, CustomError, RefreshTokenDTO>({
    mutationFn,
  });
};
