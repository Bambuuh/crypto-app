import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import MainNavigation from './navigation'
import theme from './theme';

declare const global: { HermesInternal: null | {} };

const App = () => {

  console.log('running')
  return (
    <View
      style={{
        flex: 1,
        position: 'relative',
        backgroundColor: theme.primary.color,
      }}
    >
      <MainNavigation />
    </View>
  );
};

export default App;
