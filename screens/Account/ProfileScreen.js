import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Header } from '../../components/header';
import { theme } from '../../theme';
import { InputProfile } from '../../components/input';
import { AuthContext } from '../../AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  // const { user, updateUser } = useContext(AuthContext);
  // const [username, setUsername] = useState('Your Name');
  // const [email, setEmail] = useState('Your Email');
  // const [age, setAge] = useState('Your Age');
  // const [address, setAddress] = useState('Your Address');


  const {
    language,
    realName, setRealname,
    user, updateUser,
    username, setUsername,
    email, setEmail,
    age, setAge,
    address, setAddress
  } = useContext(AuthContext);


  

  const handleSaveProfile = async () => {
    try {
      //fetch thong tin user khi an vao nut edit profile
      const response = await fetch('http://10.0.2.2:5000/api/update_profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          age,
          address,
          realName
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Cập nhật thông tin người dùng trong Context
        updateUser({
          ...user,
          email,
          age,
          address,
          realName,
        });

        Alert.alert(
          'Success',
          'Profile saved successfully!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Account'),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while updating the profile.');
    }
  };

  return (
    <View style={styles.container}>
      <Header title={language === 'vi' ? 'Chỉnh Sửa Hồ Sơ' : 'Edit Profile'} hideSearch={true} />
      <View style={styles.content}>
      
        <InputProfile
          title={language === 'vi' ? 'Họ & Tên' : 'Your Name'}
          value={realName}
          onChangeText={(text) => setRealname(text)}
        />

        <InputProfile
          title='Email'
          value={email}
          onChangeText={(text) => setEmail(text)}
        />

        <InputProfile
          title={language === 'vi' ? 'Tuổi' : 'Age'}
          value={age === null ? ""  : String(age)}
          onChangeText={(text) => setAge(text)}
        />

        <InputProfile
          title={language === 'vi' ? 'Đại Chỉ' : 'Address'}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
          <Text style={styles.saveButtonText}>{language === 'vi' ? 'Lưu Hồ Sơ' : 'Save Profile'}</Text>
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
  input: {
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
    // alignSelf: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
});

export default ProfileScreen;