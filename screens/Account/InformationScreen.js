import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { AuthContext } from '../../AuthContext';

const InformationScreen = () => {
    const { language } = useContext(AuthContext);
    
    return (
        <View style={styles.container}>
            <Header title={language === 'vi' ? 'Thông Tin' : 'Information'} hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.heading}>{language === 'vi' ? 'Về Movit' : 'About Movit'}</Text>
                <Text style={styles.text}>
                    {language === 'vi'
                        ? 'Movit là ứng dụng tốt nhất của bạn để khám phá và thưởng thức đa dạng các bộ phim. Sứ mệnh của chúng tôi là mang đến một trải nghiệm mượt mà và thú vị cho những người yêu thích phim.'
                        : 'Movit is your go-to app for discovering and enjoying a wide range of movies. Our mission is to provide a seamless and enjoyable experience for movie enthusiasts.'}
                </Text>

                <Text style={styles.heading}>{language === 'vi' ? 'Tính Năng' : 'Features'}</Text>
                <Text style={styles.text}>
                    {language === 'vi'
                        ? '- Duyệt và tìm kiếm bộ phim yêu thích của bạn.'
                        : '- Browse and search for your favorite movies.'}
                </Text>
                <Text style={styles.text}>
                    {language === 'vi'
                        ? '- Tạo danh sách cá nhân và theo dõi lịch sử xem của bạn.'
                        : '- Create personal lists and keep track of your watch history.'}
                </Text>
                <Text style={styles.text}>
                    {language === 'vi'
                        ? '- Cập nhật thông tin về các bộ phim và xu hướng mới nhất.'
                        : '- Stay up-to-date with the latest releases and trends.'}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.background,
    },
    content: {
        padding: 16,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        color: 'white',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        textAlign: 'justify',
    },
});

export default InformationScreen;