import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { Ionicons } from '@expo/vector-icons';
import { InputPassword } from '../../components/input';
import { AuthContext } from '../../AuthContext';
import { useNavigation } from '@react-navigation/native';

const PasswordScreen = () => {
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {
    language,
    username, password,
    isAuthenticated, setIsAuthenticated
  } = useContext(AuthContext)

  const handleSavePassword = async () => {
    try {
      
      const response = await fetch('http://10.0.2.2:5000/api/update_password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          current_password: password,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Success',
          'Please login again.',
          [
            {
              text: 'OK',
              onPress: () => setIsAuthenticated(false),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={language === 'vi' ? 'Thay Đổi Mật Khẩu' : 'Change Password'} hideSearch={true} />
      <View style={styles.content}>
      
        <InputPassword
          title={language === 'vi' ? 'Mật Khẩu Mới' : 'New Password'}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />

        <InputPassword
          title={language === 'vi' ? 'Xác Nhận Mật Khẩu' : 'Confirm Password'}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSavePassword}>
          <Text style={styles.saveButtonText}>{language === 'vi' ? 'Thay Đổi Mật Khẩu' : 'Change Password'}</Text>
        </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'white',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 16,
    borderWidth: 1,
    borderColor: theme.grayColor,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
    color: 'white',
  },
  saveButton: {
    backgroundColor: theme.mainColor,
    borderRadius: 8,
    padding: 10,
    marginTop: 26,
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default PasswordScreen;