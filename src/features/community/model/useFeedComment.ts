import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {ParsedFeedDetail} from './useFeedDetail';

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

interface MutationContext {
  previousFeedDetail: ParsedFeedDetail | undefined;
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

export const useFeedComment = (feedId: number | undefined) => {
  const queryClient = useQueryClient();
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<Comment, CustomError, FeedCommentDTO, MutationContext>({
    mutationFn: (requestBody: FeedCommentDTO) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      if (!feedId) {
        throw new CustomError('피드 아이디가 없습니다.');
      }
      return mutationFn(accessToken, feedId, requestBody);
    },
    onMutate: async newComment => {
      await queryClient.cancelQueries({queryKey: ['FeedDetail', feedId]});
      const previousFeedDetail = queryClient.getQueryData<ParsedFeedDetail>([
        'FeedDetail',
        feedId,
      ]);
      if (previousFeedDetail) {
        queryClient.setQueryData<ParsedFeedDetail>(
          ['FeedDetail', feedId],
          old => ({
            ...old!,
            comments: [
              ...old!.comments,
              {
                user: old!.comments[0]?.user || {nickname: '', profile_img: ''},
                content: newComment.content,
                create_at: new Date().toISOString(),
                replies: [],
              },
            ],
          }),
        );
      }

      return {previousFeedDetail} as MutationContext;
    },
    onError: (err, newComment, context) => {
      if (context?.previousFeedDetail) {
        queryClient.setQueryData(
          ['FeedDetail', feedId],
          context.previousFeedDetail,
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['FeedDetail', feedId]});
    },
  });
};
