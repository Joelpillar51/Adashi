import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Colors } from './src/constants/theme';

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={Colors.surface} />
      <AppNavigator />
    </>
  );
}
