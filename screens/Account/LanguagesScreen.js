import React, { useEffect, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { AuthContext } from '../../AuthContext';

const LanguagesScreen = () => {
    const { language, setLanguage } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Header title={language === 'vi' ? 'Ngôn Ngữ' : 'Languages'} hideSearch={true} />
            <CheckBox
                title={language === 'vi' ? 'Tiếng Anh' : 'English'}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={language === 'en'}
                onPress={() => setLanguage('en')}
                checkedColor={theme.mainColor}
                textStyle={{ color: 'white' }}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            />
            <CheckBox
                title={language === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={language === 'vi'}
                onPress={() => setLanguage('vi')}
                checkedColor={theme.mainColor}
                textStyle={{ color: 'white' }}
                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default LanguagesScreen;