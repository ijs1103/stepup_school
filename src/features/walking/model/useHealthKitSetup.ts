import React, {useState, useEffect, useRef, useCallback} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';

const useHealthKitSetup = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasRequestedPermissions = useRef(false);
  const appState = useRef(AppState.currentState);

  const healthKitPermissions: HealthKitPermissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.StepCount],
      write: [],
    },
  };

  const checkPermissions = useCallback(() => {
    AppleHealthKit.getAuthStatus(healthKitPermissions, (err, result) => {
      if (err) {
        setErrorMessage('ios 걸음관련 권한확인 중 에러발생');
        console.log(err);
      } else {
        const newHasPermissions = result.permissions.read.length > 0;
        setHasPermissions(newHasPermissions);
        hasRequestedPermissions.current = true;
      }
    });
  }, []);

  useEffect(() => {
    if (Platform.OS !== 'ios') {
      return;
    }

    AppleHealthKit.initHealthKit(healthKitPermissions, (err: string) => {
      if (err) {
        setErrorMessage('HealthKit이 에러발생으로 초기화되지 않았습니다.');
        console.log(err);
      } else {
        checkPermissions();
      }
    });
    // 앱이 백그라운드에서 포그라운드로 전환될 때 checkPermissions 호출 (사용자가 권한설정하러 갔다가 다시 앱에 접근할때 권한을 확인하기 위함)
    const subscription = AppState.addEventListener(
      'change',
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          console.log('App has come to the foreground!');
          checkPermissions();
        }
        appState.current = nextAppState;
      },
    );

    return () => {
      subscription.remove();
    };
  }, [checkPermissions]);

  if (Platform.OS !== 'ios') {
    return {
      hasPermissions: false,
      errorMessage: '',
      hasRequestedPermissions: false,
    };
  }

  return {
    hasPermissions,
    errorMessage,
    hasRequestedPermissions: hasRequestedPermissions.current,
  };
};

export default useHealthKitSetup;
