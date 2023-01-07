import React from 'react';
import { SafeAreaProvider as SafeAreaProviderOrigin } from 'react-native-safe-area-context';

export default function SafeAreaProvider({ children }) {
  return <SafeAreaProviderOrigin>{children}</SafeAreaProviderOrigin>;
}
