import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import {ParsedFeedDetail} from './useFeedDetail';
import {MutationContext} from './useFeedComment';

interface MutationVariables {
  commentId: number;
  content: string;
}

interface CommentReply {
  id: number;
  commentId: number;
  user_Id: number;
  content: string;
  create_at: string;
}

const mutationFn = async (
  accessToken: string,
  commentId: number,
  content: string,
) => {
  try {
    const response = await axios.post<CommentReply>(
      `${BASE_URL}/feed/commentReply/${commentId}`,
      {content},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.warn(`useFeedCommentReply 에러 - ${error}`);
    throw new CustomError('대댓글작성 에러가 발생.');
  }
};

export const useFeedCommentReply = (feedId: number | undefined) => {
  const queryClient = useQueryClient();
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<
    CommentReply,
    CustomError,
    MutationVariables,
    MutationContext
  >({
    mutationFn: ({commentId, content}) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      if (!feedId) {
        throw new CustomError('피드 아이디가 없습니다.');
      }
      if (!commentId) {
        throw new CustomError('댓글 아이디가 없습니다.');
      }
      return mutationFn(accessToken, commentId, content);
    },
    onMutate: async ({commentId, content}) => {
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
            comments: old!.comments.map(comment =>
              comment.id === commentId
                ? {
                    ...comment,
                    replies: [
                      ...comment.replies,
                      {
                        user: comment.replies[0]?.user || {
                          nickname: '',
                          profile_img: '',
                        },
                        content: content,
                        create_at: new Date().toISOString(),
                      },
                    ],
                  }
                : comment,
            ),
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
