import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BottomTab} from './Pages/Home';

const Tab = createBottomTabNavigator();

export default function App() {
  // return viewScaner();
  
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}
