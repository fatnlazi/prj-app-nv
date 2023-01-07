import React from 'react';
import { NavigationContainer as NavigationContainerOrigin } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home';
import CardPropsScreen from '../screens/card_props';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainerOrigin>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            // orientation: 'all',
          }}
        />

        <Stack.Screen
          name="CardProps"
          component={CardPropsScreen}
          options={{
            headerShown: false,
            presentation: 'modal',
            // orientation: 'all',
          }}
        />
      </Stack.Navigator>
    </NavigationContainerOrigin>
  );
}
