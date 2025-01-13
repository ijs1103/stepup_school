import { useAuthStore } from '@/entities/user/model/stores/useAuthStore';
import { useEffect } from 'react';
import { useRefreshToken } from './model/useRefreshToken';
import { useValidateToken } from './model/useValidateToken';

// 앱 처음실행시 accessToken의 만료를 검사하고
// 만료시 accessToken 재발급, 재발급 에러시 로그아웃 처리
export const TokenManager = () => {
    const { userData, setAccessToken, logout } = useAuthStore();
    const refreshToken = useRefreshToken();
    const { isError: isTokenExpired } = useValidateToken(userData?.access_token || '');

    useEffect(() => {
        if (userData?.refresh_token && isTokenExpired) {
            refreshToken.mutate(
                { refresh_token: userData.refresh_token },
                {
                    onSuccess: (data) => {
                        setAccessToken(data.access_token);
                        console.log('Access token refreshed successfully');
                    },
                    onError: () => {
                        console.error('Failed to refresh token');
                        logout();
                    },
                }
            );
        }
    }, []);
    return null;
};
