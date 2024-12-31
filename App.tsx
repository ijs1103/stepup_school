import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootNavigation } from '@/app/navigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <RootNavigation />
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;