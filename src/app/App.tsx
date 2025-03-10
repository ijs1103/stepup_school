import React from 'react';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {RootNavigation} from '@/app/navigation';
import {QueryProvider} from '@/shared/lib/QueryProvider';
import Toast from 'react-native-toast-message';
import {TokenManager} from '@/features/auth/model/TokenManager';
import {useFirebaseMessaging} from '@/shared/lib/hooks/useFirebaseMessaging';

const App = () => {
  // const {fcmToken} = useFirebaseMessaging();
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <>
            <TokenManager />
            <RootNavigation />
            <Toast />
          </>
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryProvider>
  );
};

export default App;
