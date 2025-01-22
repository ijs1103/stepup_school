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

export interface Reply {
  user: User;
  content: string;
  create_at: string;
}

export interface Comment {
  user: User;
  content: string;
  create_at: string;
  replies: Reply[];
}

interface FeedDetail {
  id: number;
  user: User;
  photoUrls: string[];
  content: string;
  create_at: string;
  comments: Comment[];
}

export interface ParsedFeedDetail {
  feedId: number;
  userName: string;
  createdAt: string;
  contents: string;
  avatarUrl: string;
  imageUrls: string[];
  comments: Comment[];
}

const queryFn = async (
  accessToken: string,
  feedId: number,
): Promise<FeedDetail> => {
  try {
    const response = await axios.get(`${BASE_URL}/feed/${feedId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.warn(`useFeedDetail 에러 - ${error}`);
    throw new CustomError('피드 상세 조회에 에러가 발생.');
  }
};

export const useFeedDetail = (feedId: number | undefined) => {
  const {userData} = useAuthStore();
  const accessToken = userData?.access_token;

  const query = useQuery<FeedDetail, Error, ParsedFeedDetail>({
    queryKey: ['FeedDetail', feedId],
    queryFn: () => {
      if (!accessToken) {
        throw new CustomError('인증 토큰이 없습니다.');
      }
      if (!feedId) {
        throw new CustomError('피드 아이디가 없습니다.');
      }
      return queryFn(accessToken, feedId);
    },
    retry: false,
    enabled: !!(accessToken && feedId),
    staleTime: 5 * 60 * 1000,
    select: (data): ParsedFeedDetail => {
      return {
        feedId: data.id,
        userName: data.user.nickname,
        createdAt: formatFeedDate(data.create_at),
        contents: data.content,
        avatarUrl: data.user.profile_img,
        imageUrls: data.photoUrls,
        comments: data.comments,
      };
    },
  });

  return query;
};
