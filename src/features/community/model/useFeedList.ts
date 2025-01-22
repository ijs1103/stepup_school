import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from '@/shared/constants';
import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {CustomError} from '@/shared/lib/\bCustomError';
import {formatFeedDate} from '@/shared/lib/date/formatFeedDate';

interface User {
  nickname: string;
  profile_img: string;
}

interface Comment {}

interface Feed {
  id: number;
  user: User;
  photoUrls: string[];
  content: string;
  create_at: string;
  comments: Comment[];
}

export interface ParsedFeed {
  feedId: number;
  userName: string;
  createdAt: string;
  contents: string;
  avatarUrl: string;
  imageUrls: string[];
}

const queryFn = async (accessToken: string): Promise<Feed[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/feed`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn(`useFeedList 에러 - ${error}`);
    throw new CustomError('피드리스트 조회에 에러가 발생.');
  }
};

export const useFeedList = () => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;

  const query = useQuery<Feed[], Error, ParsedFeed[]>({
    queryKey: ['FeedList', accessToken],
    queryFn: () => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      return queryFn(accessToken);
    },
    retry: false,
    enabled: !!accessToken,
    staleTime: 5 * 60 * 1000,
    select: (data): ParsedFeed[] => {
      return data.map(item => ({
        feedId: item.id,
        userName: item.user.nickname,
        createdAt: formatFeedDate(item.create_at),
        contents: item.content,
        avatarUrl: item.user.profile_img,
        imageUrls: item.photoUrls,
      }));
    },
  });

  return query;
};
