import React, { useContext, useState } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';
import StackNavigator from './StackNavigator';
import AuthStack from './AuthStack';
import { AuthContext, AuthProvider } from '../AuthContext';

const Stack = createStackNavigator();

const myTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: theme.background,
    },
};

export default function AppNavigator() {
    const { isAuthenticated } = useContext(AuthContext);
    // const isAuthenticated = useState('true');

    return (
        
        <Stack.Navigator>
            {isAuthenticated
                ? (
                    <Stack.Screen name="StackNavigator" component={StackNavigator} options={{ headerShown: false }} />
                )
                : (
                    <Stack.Screen name="AuthStack" component={AuthStack} options={{ headerShown: false }} />
                )
            }
        </Stack.Navigator>
        
    );
}