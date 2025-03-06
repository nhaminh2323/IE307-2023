import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { AuthContext } from '../../AuthContext';

const UseScreen = () => {
    const { language } = useContext(AuthContext);
    
    const isVietnamese = language === 'vi';

    return (
        <View style={styles.container}>
            <Header title={isVietnamese ? "Điều khoản sử dụng" : "Terms of Use"} hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.text}>
                    {isVietnamese
                        ? "Chào mừng bạn đến với Movit, ứng dụng xem phim hàng đầu của bạn. Bằng cách sử dụng ứng dụng của chúng tôi, bạn đồng ý tuân thủ và chấp nhận các điều khoản và điều kiện sau đây:"
                        : "Welcome to Movit, your go-to app for streaming movies. By using our app, you agree to comply with and be bound by the following terms and conditions:"}
                </Text>
                <Text style={styles.heading}>1. {isVietnamese ? "Chấp nhận các điều khoản" : "Acceptance of Terms"}</Text>
                <Text style={styles.text}>
                    {isVietnamese
                        ? "Bằng cách truy cập hoặc sử dụng Movit, bạn thừa nhận rằng bạn đã đọc, hiểu và đồng ý tuân thủ các điều khoản này."
                        : "By accessing or using Movit, you acknowledge that you have read, understood, and agree to be bound by these terms."}
                </Text>
                <Text style={styles.heading}>2. {isVietnamese ? "Tài khoản người dùng" : "User Accounts"}</Text>
                <Text style={styles.text}>
                    {isVietnamese
                        ? "Để sử dụng các tính năng cụ thể của Movit, bạn có thể cần tạo một tài khoản người dùng. Bạn chịu trách nhiệm duy trì tính bảo mật cho thông tin tài khoản của mình."
                        : "To use certain features of Movit, you may be required to create a user account. You are responsible for maintaining the confidentiality of your account information."}
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

export default UseScreen;