import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { AuthContext } from '../../AuthContext';

const PrivacyScreen = () => {
    const { language } = useContext(AuthContext);
    
    const isVietnamese = language === 'vi';

    return (
        <View style={styles.container}>
            <Header title={isVietnamese ? "Chính sách quyền riêng tư" : "Privacy Policy"} hideSearch={true} />
            <View style={styles.content}>
                <Text style={styles.heading}>1. {isVietnamese ? "Thông tin chúng tôi thu thập" : "Information We Collect"}</Text>
                <Text style={styles.text}>
                    {isVietnamese ? "Chúng tôi có thể thu thập thông tin bạn cung cấp trực tiếp cho chúng tôi, chẳng hạn như tên, địa chỉ email và các thông tin cá nhân khác khi bạn sử dụng ứng dụng của chúng tôi." : "We may collect information that you provide to us directly, such as your name, email address, and other personal information when you use our app."}
                </Text>

                <Text style={styles.heading}>2. {isVietnamese ? "Cách chúng tôi sử dụng thông tin của bạn" : "How We Use Your Information"}</Text>
                <Text style={styles.text}>
                    {isVietnamese ? "Chúng tôi sử dụng thông tin mà chúng tôi thu thập để cung cấp và cải thiện dịch vụ, cá nhân hóa trải nghiệm của bạn và gửi cho bạn các cập nhật và thông báo khuyến mãi." : "We use the information we collect to provide and improve our services, personalize your experience, and send you updates and promotional messages."}
                </Text>

                <Text style={styles.heading}>3. {isVietnamese ? "Bảo mật dữ liệu" : "Data Security"}</Text>
                <Text style={styles.text}>
                    {isVietnamese ? "Chúng tôi thực hiện các biện pháp hợp lý để bảo vệ thông tin cá nhân của bạn khỏi việc truy cập hoặc tiết lộ trái phép." : "We take reasonable measures to protect your personal information from unauthorized access or disclosure."}
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

export default PrivacyScreen;