import React, {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import {initialize, requestPermission} from 'react-native-health-connect';

const useHealthConnectSetup = () => {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasRequestedPermissions = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return;
    }

    const setupHealthConnect = async () => {
      try {
        const isInitialized = await initialize();
        if (!isInitialized) {
          setErrorMessage(
            'HealthConnect가 에러발생으로 초기화되지 않았습니다.',
          );
          return;
        }

        const handleAppStateChange = async (nextAppState: AppStateStatus) => {
          if (
            appState.current.match(/inactive|background/) &&
            nextAppState === 'active'
          ) {
            const grantedPermissions = await requestPermission([
              {accessType: 'read', recordType: 'Steps'},
              {accessType: 'read', recordType: 'StepsCadence'},
            ]);
            hasRequestedPermissions.current = true;
            setHasPermissions(grantedPermissions.length > 0);
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
      } catch (error) {
        setErrorMessage('HealthConnect 설정 중 오류가 발생했습니다.');
        console.error(error);
      }
    };

    setupHealthConnect();
  }, []);

  if (Platform.OS !== 'android') {
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

export default useHealthConnectSetup;
