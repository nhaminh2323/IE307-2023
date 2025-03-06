import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { AuthContext } from '../../AuthContext';

const ContactScreen = () => {
    const { language } = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Header title={language === 'vi' ? 'Liên hệ' : 'Contact'} hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.heading}>
                    {language === 'vi' ? 'Thông tin liên hệ' : 'Contact Information'}
                </Text>
                <Text style={styles.text}>
                    {language === 'vi'
                        ? 'Nếu bạn có bất kỳ câu hỏi hoặc phản hồi nào về ứng dụng Movit, hãy liên hệ với chúng tôi:'
                        : 'If you have any questions or feedback regarding the Movit app, feel free to contact us:'}
                </Text>
                <Text style={styles.text}>Email: support@movitapp.com</Text>
                <Text style={styles.text}>Phone: +123 456 7890</Text>
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
        marginVertical: 10,
        color: 'white',
    },
    text: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
        textAlign: 'justify',
    },
});

export default ContactScreen;