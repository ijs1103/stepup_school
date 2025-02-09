import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';

interface MutationVariables {
  imageKey: string;
}
interface AxiosFnVariables extends MutationVariables {
  accessToken: string;
}
interface UpdateAvatar {
  success: boolean;
  message: string;
}

const axiosFn = async ({
  accessToken,
  imageKey,
}: AxiosFnVariables): Promise<UpdateAvatar> => {
  try {
    const response = await axios.patch<UpdateAvatar>(
      `${BASE_URL}/user/profile-img`,
      {profile_img: imageKey},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`useUpdateAvatar 에러 - ${error}`);
    throw new CustomError('아바타 업데이트 에러가 발생.');
  }
};

export const useUpdateAvatar = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<UpdateAvatar, CustomError, MutationVariables>({
    mutationFn: ({imageKey}) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return axiosFn({accessToken, imageKey});
    },
  });
};
