import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AuthContext } from '../AuthContext';
import { InputProfile, InputPassword } from '../components/input';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const LoginScreen = ({ navigation }) => {

  const {
    username, setUsername,
    password, setPassword,
    handleLogin,
    realName, setRealname,
    email, setEmail,
    address, setAddress,

  } = useContext(AuthContext);

  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('http://10.0.2.2:5000/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log(data.message);
  //       navigation.navigate('Home');
  //     } else {
  //       console.error(data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity style={[Buttonstyles.background, styles.buttonContainerItem]} onPress={() => navigation.navigate('Introducing')}>
        <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
      </TouchableOpacity>
      <View style={styles.container}>
        <Image
          source={require('../assets/images/logo0.5.png')}
          style={styles.logo}
        />
        {/* <Text style={styles.title}>Login</Text> */}

        <InputProfile
          placeholder={"Username"}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <InputPassword
          placeholder={"Password"}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signupButton} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupText}>Don't have an account? <Text style={Mainstyles.mainText}>Register</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 50,
  },
  logo: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  buttonContainerItem: {
    position: 'absolute',
    top: 30,
    left: 20,
    borderRadius: 10,
    padding: 1,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'center',
  },
  input: {
    color: 'white',
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  signupText: {
    color: theme.grayColor,
  },
  signupButton: {
    alignItems: 'center',
    marginTop: 10,
  },
});

export default LoginScreen;
