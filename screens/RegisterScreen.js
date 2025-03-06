import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { InputProfile, InputPassword } from '../components/input';
import { Mainstyles, Buttonstyles, theme } from '../theme';
import { AuthContext } from '../AuthContext';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { color } from 'react-native-elements/dist/helpers';

const RegisterScreen = ({ navigation }) => {

  const {
    username, setUsername,
    realName, setRealname,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    handleRegister,
  } = useContext(AuthContext);

  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  // const handleRegister = async () => {
  //   try {
  //     if (!username || !email || !password || password !== confirmPassword) {
  //       console.error('Invalid input. Please check your information.');
  //       return;
  //     }

  //     const response = await fetch('http://10.0.2.2:5000/api/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         email,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       console.log(data.message);
  //       navigation.navigate('Login');
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
        {/* <Text style={styles.title}>Register</Text> */}

        <InputProfile
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />

        <InputProfile
          placeholder="Your Name"
          onChangeText={(text) => setRealname(text)}
          value={realName}
        />

        <InputProfile
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />

        <InputPassword
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
        />

        <InputPassword
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? <Text style={Mainstyles.mainText}>Log in</Text></Text>
        </TouchableOpacity>
        <Text style={styles.note}>By register, you agree to Terms of Use and Privacy Policy</Text>
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
    marginBottom: 20,
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
  loginText: {
    color: theme.grayColor,
  },
  loginButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  note: {
    color: 'white',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default RegisterScreen;