import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Full Name"
        style={styles.input}
        onChangeText={setName}
      />

      <TextInput
        placeholder="Role (senior / caregiver / volunteer)"
        style={styles.input}
        onChangeText={setRole}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
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