import React, {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';
import {initialize, requestPermission} from 'react-native-health-connect';

export const useHealthConnectSetup = async () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasRequestedPermissions = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const setupHealthConnect = async () => {
      const isInitialized = await initialize();
      if (!isInitialized) {
        setErrorMessage('HealthConnect가 에러발생으로 초기화되지 않았습니다.');
        return;
      }

      const handleAppStateChange = async (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === 'active'
        ) {
          const grantedPermissions = await requestPermission([
            {accessType: 'read', recordType: 'Steps'},
          ]);
          hasRequestedPermissions.current = true;
          console.log('안드 허용 퍼미션: ', grantedPermissions);
          //setHasPermissions(grantedPermissions.length > 0);
        }
        appState.current = nextAppState;
      };

      const subscription = AppState.addEventListener(
        'change',
        handleAppStateChange,
      );

      return () => {
        subscription.remove();
      };
    };

    setupHealthConnect();
  }, []);

  return {
    hasPermissions,
    errorMessage,
    hasRequestedPermissions: hasRequestedPermissions.current,
  };
};
