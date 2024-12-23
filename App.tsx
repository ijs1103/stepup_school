import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootNavigation } from '@/app/navigation';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <RootNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;