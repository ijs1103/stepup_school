import React, {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus, Platform} from 'react-native';
import GoogleFit, {Scopes} from 'react-native-google-fit';

interface GoogleFitSetupResult {
  hasPermissions: boolean;
  errorMessage: string | null;
  hasRequestedPermissions: boolean;
}

const GOOGLE_FIT_OPTIONS = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_LOCATION_READ,
  ],
};

const ERROR_MESSAGES = {
  INIT_FAILED: 'GoogleFit 에러발생으로 초기화되지 않았습니다.',
  SETUP_ERROR: 'GoogleFit 설정 중 오류가 발생했습니다.',
};

const useGoogleFitSetup = (): GoogleFitSetupResult => {
  if (Platform.OS !== 'android') {
    return {
      hasPermissions: false,
      errorMessage: null,
      hasRequestedPermissions: false,
    };
  }
  const [hasPermissions, setHasPermissions] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const hasRequestedPermissions = useRef(false);
  const appState = useRef(AppState.currentState);

  const googleFitRecording = async () => {
    return new Promise((resolve, reject) => {
      GoogleFit.startRecording(
        callback => {
          if (callback.recording) {
            console.log('Google Fit recording started successfully');
            resolve(callback);
          } else {
            reject(new Error('Failed to start Google Fit recording'));
          }
        },
        ['step'],
      );
    });
  };

  const authorizeGoogleFit = async () => {
    const authorized = await GoogleFit.authorize(GOOGLE_FIT_OPTIONS);
    setHasPermissions(authorized.success);
    if (!authorized.success) {
      setErrorMessage(ERROR_MESSAGES.INIT_FAILED);
    }
  };

  const handleAppStateChange = async (nextAppState: AppStateStatus) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      await authorizeGoogleFit();
    }
    hasRequestedPermissions.current = true;
    appState.current = nextAppState;
  };

  useEffect(() => {
    const setupGoogleFit = async () => {
      try {
        await authorizeGoogleFit();
        const subscription = AppState.addEventListener(
          'change',
          handleAppStateChange,
        );
        await googleFitRecording();
        return () => subscription.remove();
      } catch (error) {
        setErrorMessage(ERROR_MESSAGES.SETUP_ERROR);
        console.log(error);
      }
    };

    setupGoogleFit();
  }, []);

  return {
    hasPermissions,
    errorMessage,
    hasRequestedPermissions: hasRequestedPermissions.current,
  };
};

export default useGoogleFitSetup;
