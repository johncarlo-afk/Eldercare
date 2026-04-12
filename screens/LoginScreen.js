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

      <View style={styles.card}>
        <Text style={styles.title}>Elder Care Matters</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
          Create Account
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding: 20
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333'
  },

  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 12,
    marginTop: 5
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#333'
  }
});