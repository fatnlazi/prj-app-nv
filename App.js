import React from 'react';
import Navigation from './src/navigation';
import ReduxProvider from './src/redux/provider';
import SafeAreaProvider from './src/components/safe_area/provider';

export default function App() {
  return (
    <ReduxProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </ReduxProvider>
  );
}
