import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

export default function RegisterScreen({ navigation }) {

  // Store input values
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  // Function to send data to PHP
  const handleRegister = () => {

    // Basic validation
    if (!name || !email || !password || !role) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    axios.post('http://192.168.0.216/eldercare-api/register.php', {
      name: name,
      email: email,
      password: password,
      role: role
    })
    .then(res => {
      Alert.alert("Success", "Account created!");
      navigation.navigate('Login'); // go back to login
    })
    .catch(err => console.log("REGISTER ERROR:", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {/* Name input */}
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        onChangeText={setName}
      />

      {/* Email input */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={setEmail}
      />

      {/* Password input */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
      />

      {/* Role input */}
      <TextInput
        placeholder="Role (Senior / Caregiver / Volunteer)"
        style={styles.input}
        onChangeText={setRole}
      />

      {/* Register button */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 26, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    borderRadius: 8
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center'
  }
});