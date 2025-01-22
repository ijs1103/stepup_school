import {useMutation} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';

interface FeedCommentDTO {
  content: string;
}

interface Comment {
  id: number;
  feedId: number;
  user_Id: number;
  content: string;
  create_at: string;
}

const mutationFn = async (
  accessToken: string,
  feedId: number,
  requestBody: FeedCommentDTO,
) => {
  try {
    const response = await axios.post<Comment>(
      `${BASE_URL}/feed/comment/${feedId}`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.warn(`useFeedComment 에러 - ${error}`);
    throw new CustomError('댓글작성 에러가 발생.');
  }
};

export const useFeedComment = (feedId: number | undefined, requestBody: FeedCommentDTO) => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<Comment, CustomError>({
    mutationFn: () => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      if (!feedId) {
        throw new CustomError('피드 아이디가 없습니다.');
      }
      return mutationFn(accessToken, feedId, requestBody);
    },
  });
};
