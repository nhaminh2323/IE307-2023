import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Intro/SplashScreen';
import SliderScreen from '../screens/Intro/SliderScreen';
import Introducing from '../screens/Intro/Introducing';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

import HomeScreen from '../screens/HomeScreen';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Slider" component={SliderScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Introducing" component={Introducing} options={{ headerShown: false }} />

            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

            {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} /> */}
        </Stack.Navigator>
    );
};

export default AuthStack;