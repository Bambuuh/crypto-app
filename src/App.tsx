import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { StatusBar, View } from 'react-native';
import { CoinsContextRoot } from './context';
import { apolloClient } from './graphql/config';
import RootNavigation from './navigation';
import theme from './theme';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <StatusBar barStyle="light-content" />
      <CoinsContextRoot>
        <View
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: theme.primary.color,
          }}
        >
          <RootNavigation />
        </View>
      </CoinsContextRoot>
    </ApolloProvider>
  );
};

export default App;
