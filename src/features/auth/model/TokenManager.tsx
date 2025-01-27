import {useAuthStore} from '@/entities/user/model/stores/useAuthStore';
import {useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {useRefreshToken} from './useRefreshToken';
import {validateTokenAxiosFn} from './useValidateToken';

export const TokenManager = () => {
  const appState = useRef(AppState.currentState);
  const validateInterval = useRef<NodeJS.Timeout>();
  const {isLoggedIn, userData, setAccessToken, logout} = useAuthStore();
  const {mutate} = useRefreshToken();

  const startTokenValidation = () => {
    // 이전 인터벌 제거
    if (validateInterval.current) {
      clearInterval(validateInterval.current);
    }

    // 최초 실행
    validateToken();

    // 25분 간격으로 설정 (여유 시간 확보)
    validateInterval.current = setInterval(() => {
      validateToken();
    }, 25 * 60 * 1000);
  };

  const validateToken = async () => {
    if (!userData?.refresh_token) {
      logout();
      return;
    }

    const refreshAccessToken = () => {
      mutate(
        {refresh_token: userData.refresh_token},
        {
          onSuccess: data => {
            setAccessToken(data.access_token);
            console.log('Access token refreshed successfully');
          },
          onError: () => {
            console.log('Failed to refresh token');
            logout();
          },
        },
      );
    };

    // access_token이 없거나 유효하지 않은 경우 refresh
    if (
      !userData?.access_token ||
      !(await validateTokenAxiosFn(userData.access_token))
    ) {
      refreshAccessToken();
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    // 앱 상태 변경 리스너
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // 앱이 포그라운드로 돌아올 때 토큰 검증 재시작
        startTokenValidation();
      }
      appState.current = nextAppState;
    });

    // 최초 토큰 검증 시작
    if (userData?.refresh_token) {
      startTokenValidation();
    }

    return () => {
      subscription.remove();
      if (validateInterval.current) {
        clearInterval(validateInterval.current);
      }
    };
  }, [userData?.refresh_token]);
  return null;
};
