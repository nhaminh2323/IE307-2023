import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icons from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';
import { AuthContext } from '../AuthContext';

import HomeScreen from '../screens/HomeScreen';
import GenresScreen from '../screens/GenresScreen';
import AccountScreen from '../screens/AccountScreen';

import LoginScreen from '../screens/LoginScreen';

const Bottom = createBottomTabNavigator();

const TabIcon = ({ name, focused }) => {
    return (
        <Icons name={name} size={25}
            color={focused ? theme.background : 'white'}
        />
    );
};

const homeScreenOptions = (headerShown, name, title) => {
    return {
        headerShown: headerShown,
        headerStyle: {
            backgroundColor: theme.subBackground,
        },
        headerTintColor: 'white',
        tabBarLabel: title,
        tabBarIcon: ({ focused }) => <TabIcon name={name} focused={focused} />,
    };
};

const BottomTab = () => {
    const { language } = useContext(AuthContext);

    const appNames = {
        vi: { home: "Trang Chủ", genres: "Thể Loại", account: "Tài Khoản" },
        en: { home: "Home", genres: "Genres", account: "Account" },
    };

    return (
        <Bottom.Navigator
            screenOptions={{
                tabBarActiveBackgroundColor: theme.mainColor,
                tabBarInactiveBackgroundColor: theme.background,
                tabBarActiveTintColor: theme.background,
                tabBarInactiveTintColor: 'white',
                tabBarLabelStyle: { fontSize: 13, fontWeight: 'bold' },
            }}
        >
            <Bottom.Screen name="Home" component={HomeScreen}
                options={homeScreenOptions(false, 'home', appNames[language].home)} />
            <Bottom.Screen name="Genres" component={GenresScreen}
                options={homeScreenOptions(false, 'grid', appNames[language].genres)} />
            <Bottom.Screen name="Account" component={AccountScreen}
                options={homeScreenOptions(false, 'person', appNames[language].account)} />
        </Bottom.Navigator>
    );
};

export default BottomTab;