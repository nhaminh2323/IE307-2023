import React, { useContext} from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { StatusBar } from 'expo-status-bar';
import { Mainstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';

const HeaderMovit = ({ title, hideSearch }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    <Text style={{textTransform: 'capitalize'}}>{title} </Text>
                    <Text style={Mainstyles.mainText}>M</Text>ovit
                </Text>
            </View>
            {!hideSearch && (
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const Header = ({ title, hideSearch }) => {
    const navigation = useNavigation();
    const {
        getWatchLater, username
    } = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon width={28} height={28} color="white" />
                </TouchableOpacity>
                <Text style={[styles.title, {textTransform: 'capitalize'}]}>
                    {title && title.length > 20 ? title.slice(0, 14) + '...' : title}
                </Text>
            </View>
            {!hideSearch && (
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <MagnifyingGlassIcon size={30} strokeWidth={2} color="white" />
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        backgroundColor: theme.subBackground,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
    },
    title: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    },
    iconButton: {
        borderRadius: 10,
        padding: 1,
        backgroundColor: theme.mainColor,
    },
});

export { HeaderMovit, Header };