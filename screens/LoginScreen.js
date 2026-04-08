import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function LoginScreen({ navigation }) {

  // Store login inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Login function
  const handleLogin = () => {

    if (!email || !password) {
      Alert.alert("Error", "Enter email and password");
      return;
    }

    axios.post('http://192.168.0.216/eldercare-api/login.php', {
      email: email,
      password: password
    })
    .then(res => {

      console.log("LOGIN RESPONSE:", res.data);

      if (res.data.status === 'success') {

        // Send user data to Home
        navigation.navigate('Home', { user: res.data.user });

      } else {
        Alert.alert("Error", "Invalid credentials");
      }

    })
    .catch(err => console.log("LOGIN ERROR:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elder Care Matters</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      {/* Login button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Go to register */}
      <Text
        style={styles.link}
        onPress={() => navigation.navigate('Register')}
      >
        Create Account
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: 'blue'
  }
});