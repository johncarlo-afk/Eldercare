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

      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        <TextInput placeholder="Full Name" style={styles.input} onChangeText={setName} />
        <TextInput placeholder="Email" style={styles.input} onChangeText={setEmail} />
        <TextInput placeholder="Password" secureTextEntry style={styles.input} onChangeText={setPassword} />
        <TextInput placeholder="Role (Senior / Caregiver / Volunteer)" style={styles.input} onChangeText={setRole} />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12
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
  }
});