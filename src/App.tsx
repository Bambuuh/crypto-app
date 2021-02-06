import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { View } from 'react-native';
import { CoinsContextRoot } from './context';
import { apolloClient } from './graphql/config';
import MainNavigation from './navigation'
import theme from './theme';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <CoinsContextRoot>
        <View
          style={{
            flex: 1,
            position: 'relative',
            backgroundColor: theme.primary.color,
          }}
        >
          <MainNavigation />
        </View>
      </CoinsContextRoot>
    </ApolloProvider>
  );
};

export default App;
