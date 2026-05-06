import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

import axios from 'axios';

// DROPDOWN IMPORT
import { Picker } from '@react-native-picker/picker';

export default function RegisterScreen({ navigation }) {

  // STORE INPUT VALUES
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Senior');

  // REGISTER FUNCTION
  const handleRegister = () => {

    // VALIDATION
    if (!name || !age || !bio || !email || !password || !role) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    // ✅ EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address"
      );
      return;
    }

    // SEND DATA TO API
    axios.post('http://192.168.0.216/eldercare-api/register.php', {

      name: name,
      age: parseInt(age),
      bio: bio,
      email: email,
      password: password,
      role: role

    })

    .then(res => {

      Alert.alert(
        "Success",
        "Account created successfully!"
      );

      navigation.navigate('Login');

    })

    .catch(err => {
      console.log("REGISTER ERROR:", err);
    });
  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.card}>

        {/* TITLE */}
        <Text style={styles.title}>
          Create Account
        </Text>

        {/* FULL NAME */}
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          onChangeText={setName}
        />

        {/* AGE */}
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={setAge}
        />

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        {/* BIO */}
        <TextInput
          placeholder="Short Bio"
          multiline
          numberOfLines={4}
          style={styles.bioInput}
          onChangeText={setBio}
        />

        {/* ROLE DROPDOWN */}
        <View style={styles.pickerContainer}>

          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
          >

            <Picker.Item label="Senior" value="Senior" />
            <Picker.Item label="Caregiver" value="Caregiver" />
            <Picker.Item label="Volunteer" value="Volunteer" />

          </Picker>

        </View>

        {/* REGISTER BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
        >

          <Text style={styles.buttonText}>
            Register
          </Text>

        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding: 20
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    elevation: 5
  },

  title: {
    fontSize: 28,
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

  bioInput: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top'
  },

  pickerContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden'
  },

  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});