import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {UserMe} from '@/features/auth/model/useUser';

interface MutationVariables {
  height: number;
  weight: number;
}
interface AxiosFnVariables extends MutationVariables {
  accessToken: string;
}
interface User {
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
interface MutationContext {
  previousUserInfo?: UserMe;
}

const axiosFn = async ({
  accessToken,
  height,
  weight,
}: AxiosFnVariables): Promise<User> => {
  try {
    const response = await axios.patch<User>(
      `${BASE_URL}/user`,
      {height, weight},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(`useUpdateUser 에러 - ${error}`);
    throw new CustomError('유저정보 업데이트 에러가 발생.');
  }
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<User, CustomError, MutationVariables, MutationContext>({
    mutationFn: ({height, weight}) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return axiosFn({accessToken, height, weight});
    },
    onMutate: async newUserInfo => {
      await queryClient.cancelQueries({
        queryKey: ['/user/me', userData?.userId ?? ''],
      });

      const previousUserInfo = queryClient.getQueryData<UserMe>([
        '/user/me',
        userData?.userId ?? '',
      ]);

      if (previousUserInfo) {
        const updatedUserInfo = {
          ...previousUserInfo,
          height: newUserInfo.height ?? previousUserInfo.height,
          weight: newUserInfo.weight ?? previousUserInfo.weight,
        };
        queryClient.setQueryData<UserMe>(
          ['/user/me', userData?.userId ?? ''],
          updatedUserInfo,
        );
      }
      return {previousUserInfo};
    },
    onError: (err, newUserInfo, context) => {
      if (context?.previousUserInfo) {
        queryClient.setQueryData(
          ['/user/me', userData?.userId ?? ''],
          context.previousUserInfo,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ['/user/me', userData?.userId ?? ''],
      });
    },
  });
};
