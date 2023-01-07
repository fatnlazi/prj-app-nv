import React from 'react';
import { View } from 'react-native';
import { SafeAreaView as SafeAreaViewOrigin } from 'react-native-safe-area-context';
import StatusBar from '../status_bar';

export default function SafeAreaView({ style, children, onLayout }) {
  return (
    <SafeAreaViewOrigin
      style={[
        style,
        {
          flex: 1,
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          // alignItems: 'center',
        },
      ]}
    >
      <View
        style={[
          {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            // width: '100%',
            // height: '100%',
          },
        ]}
        onLayout={onLayout}
      >
        <StatusBar />
        {children}
      </View>
    </SafeAreaViewOrigin>
  );
}
