import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';

interface MutationVariables {
  requestBody: FormData;
}
interface AxiosFnVariables extends MutationVariables {
  accessToken: string;
}
interface ImageUpload {
  keys: string[];
}

const axiosFn = async ({
  accessToken,
  requestBody,
}: AxiosFnVariables): Promise<ImageUpload> => {
  try {
    const response = await axios.post<ImageUpload>(
      `${BASE_URL}/s3/upload`,
      requestBody,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.warn(`useImageUpload 에러 - ${error}`);
    throw new CustomError('이미지 업로드 에러가 발생.');
  }
};

export const useImageUpload = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<ImageUpload, CustomError, MutationVariables>({
    mutationFn: ({requestBody}) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return axiosFn({accessToken, requestBody});
    },
  });
};
