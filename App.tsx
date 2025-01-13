import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { RootNavigation } from '@/app/navigation';
import { QueryProvider } from '@/shared/lib/QueryProvider';
import Toast from 'react-native-toast-message';
import { TokenManager } from '@/features/auth/TokenManager';

const App = () => {
  return (
    <QueryProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
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