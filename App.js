import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { MovieProvider } from './AuthContext';
import AppNavigator from './navigation/AppNavigator';
import { theme } from './theme';

const myTheme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      background: theme.background,
  },
};

const App = () => {

  return (
    <NavigationContainer theme={myTheme}>
      <MovieProvider>
        <AppNavigator />
      </MovieProvider>
    </NavigationContainer>
  );
};

export default App;