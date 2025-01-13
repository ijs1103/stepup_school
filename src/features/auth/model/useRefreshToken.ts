import {useMutation} from '@tanstack/react-query';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {AxiosError} from 'axios';
import {BASE_URL} from '@/shared/constants';

export interface RefreshTokenDTO {
  refresh_token: string;
}

interface RefreshTokenResponse {
  access_token: string;
}

const mutationFn = async (data: RefreshTokenDTO): Promise<RefreshTokenResponse> => {
  const response = await axios.post<RefreshTokenResponse>(
    `${BASE_URL}/auth/refresh`,
    data,
  );
  return response.data;
};

export const useRefreshToken = () => {
  return useMutation<RefreshTokenResponse, Error, RefreshTokenDTO>({
    mutationFn,
    onError: error => {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;

        switch (statusCode) {
          case 400:
            console.error('유효하지 않은 토큰입니다.');
            break;
          default:
            console.error('알 수 없는 오류가 발생했습니다.');
        }
      } else {
        console.error('네트워크 오류가 발생했습니다.');
      }
    },
  });
};
