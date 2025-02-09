import {useMutation, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {CustomError} from '@/shared/lib/\bCustomError';
import {useAuthStore} from '@/features/user/model/stores/useAuthStore';
import {ParsedFeed} from './useFeedList';
import {formatFeedDate} from '@/shared/lib/date/formatFeedDate';

interface RequestBody {
  content: string;
  photoKeys: string[];
  create_at: string;
}

interface MutationVariables extends RequestBody {
  userName: string;
  avatarUrl: string;
}

interface MutationContext {
  previousFeedList: ParsedFeed[] | undefined;
}

interface Feed {
  id: number;
  user_Id: number;
  content: string;
  photoKeys: string[];
  create_at: string;
}

const mutationFn = async (accessToken: string, requestBody: RequestBody) => {
  try {
    const response = await axios.post<Feed>(`${BASE_URL}/feed`, requestBody, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn(`useFeed 에러 - ${error}`);
    throw new CustomError('피드작성 에러가 발생.');
  }
};

export const useFeed = () => {
  const queryClient = useQueryClient();
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;
  return useMutation<Feed, CustomError, MutationVariables, MutationContext>({
    mutationFn: ({
      userName,
      avatarUrl,
      content,
      photoKeys,
      create_at,
    }: MutationVariables) => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return mutationFn(accessToken, {content, photoKeys, create_at});
    },
    onMutate: async newFeed => {
      await queryClient.cancelQueries({queryKey: ['FeedList']});
      const previousFeedList = queryClient.getQueryData<ParsedFeed[]>([
        'FeedList',
      ]);

      if (previousFeedList) {
        queryClient.setQueryData<ParsedFeed[]>(['FeedList'], old => {
          const newParsedFeed: ParsedFeed = {
            feedId: Date.now(), // 임시 ID
            userName: newFeed.userName || '',
            createdAt: formatFeedDate(newFeed.create_at),
            contents: newFeed.content,
            avatarUrl: newFeed.avatarUrl || '',
            imageUrls: newFeed.photoKeys,
          };
          return [newParsedFeed, ...(old || [])];
        });
      }

      return {previousFeedList};
    },
    onError: (err, newFeed, context) => {
      if (context?.previousFeedList) {
        queryClient.setQueryData(['FeedList'], context.previousFeedList);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['FeedList']});
    },
  });
};
