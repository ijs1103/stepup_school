import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';

interface ErrorResponse {
  statusCode: number;
  message: string;
  timestamp: string;
  path: string;
}

const validateToken = async (accessToken: string) => {
  const response = await axios.get(`${BASE_URL}/auth/validate`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

export const useValidateToken = (token: string) => {
  return useQuery<string, ErrorResponse>({
    queryKey: ['validateToken', token],
    queryFn: () => {
      if (!token) {
        throw new Error('인증 토큰이 없습니다.');
      }
      return validateToken(token);
    },
    retry: false,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
};
