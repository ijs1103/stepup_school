import {useEffect} from 'react';
import Toast from 'react-native-toast-message';

const useErrorToast = (errorMessage: string) => {
  useEffect(() => {
    if (errorMessage !== '') {
      Toast.show({
        type: 'error',
        text1: errorMessage,
        position: 'top',
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  }, [errorMessage]);
};

export default useErrorToast;