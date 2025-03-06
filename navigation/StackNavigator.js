import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from '../theme';

import BottomTab from './BottomTab';
import ListScreen from '../screens/ListScreen';
import DetailScreen from '../screens/DetailScreen';
import VideoScreen from '../screens/VideoScreen';
import TrailerScreen from '../screens/TrailerScreen';
import SearchScreen from '../screens/SearchScreen';
import PersonScreen from '../screens/PersonScreen';

import AccountScreen from '../screens/AccountScreen';
import ProfileScreen from '../screens/Account/ProfileScreen';
import PasswordScreen from '../screens/Account/PasswordScreen';

import LanguagesScreen from '../screens/Account/LanguagesScreen';
import InformationScreen from '../screens/Account/InformationScreen';
import UseScreen from '../screens/Account/UseScreen';
import PrivacyScreen from '../screens/Account/PrivacyScreen';
import ContactScreen from '../screens/Account/ContactScreen';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="HomeBottomTab" component={BottomTab} options={{ headerShown: false }} />
            <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={DetailScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Player" component={VideoScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Trailer" component={TrailerScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Person" component={PersonScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Account" component={AccountScreen} options={{ headerShown: false }} />

            {/* Profile */}
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Password" component={PasswordScreen} options={{ headerShown: false }} />

            {/* Settings */}
            <Stack.Screen name="Languages" component={LanguagesScreen} options={{ headerShown: false }} />

            {/* Support */}
            <Stack.Screen name="Information" component={InformationScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Use" component={UseScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Contact" component={ContactScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default StackNavigator;