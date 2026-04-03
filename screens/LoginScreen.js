import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

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