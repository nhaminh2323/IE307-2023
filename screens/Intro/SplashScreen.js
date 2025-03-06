import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Giá trị khởi tạo

  useEffect(() => {
    // Sử dụng Animated.parallel để thực hiện nhiều animations cùng một lúc
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000, // Độ dài của animation (milliseconds)
        useNativeDriver: true, // Sử dụng native driver để tối ưu hiệu suất
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3, // Độ ma sát của animation (càng cao, càng ít dao động)
        tension: 10, // Độ căng của animation (càng cao, càng nhanh chóng đến giá trị đích)
        useNativeDriver: true, // Sử dụng native driver để tối ưu hiệu suất
      }),
    ]).start();

    // Sử dụng setTimeout để chuyển hướng sau 3 giây
    const timeoutId = setTimeout(() => {
      navigation.navigate('Slider');
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
      fadeAnim.setValue(0); // Đặt giá trị của animation về 0 khi component unmount
    };
  }, [fadeAnim, scaleAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/images/logo0.5.png')}
        style={[styles.logo, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
  },
  logo: {
    width: width * 0.65, // 65% chiều rộng của màn hình
    height: height * 0.3, // 30% chiều cao của màn hình
    resizeMode: 'contain',
    margin: 30,
  },
});

export default SplashScreen;