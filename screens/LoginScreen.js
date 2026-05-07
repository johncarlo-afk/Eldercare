// IMPORT REACT + STATE HOOK
import React, { useState } from 'react';

// IMPORT UI COMPONENTS
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';

// IMPORT AXIOS FOR API REQUESTS
import axios from 'axios';

// LOGIN SCREEN COMPONENT
export default function LoginScreen({ navigation }) {

  // STORE EMAIL INPUT
  const [email, setEmail] = useState('');

  // STORE PASSWORD INPUT
  const [password, setPassword] = useState('');

  // FUNCTION TO LOGIN USER
  const handleLogin = () => {

    // CHECK IF INPUTS ARE EMPTY
    if (!email || !password) {

      Alert.alert(
        "Error",
        "Enter email and password"
      );

      return;
    }

    // SEND LOGIN DATA TO PHP API
    axios.post(
      'http://192.168.0.216/eldercare-api/login.php',

      {
        // SEND USER EMAIL
        email: email,

        // SEND USER PASSWORD
        password: password
      }
    )

    .then(res => {

      // SHOW RESPONSE IN CONSOLE
      console.log("LOGIN RESPONSE:", res.data);

      // IF LOGIN SUCCESS
      if (res.data.status === 'success') {

        // GO TO HOME SCREEN
        navigation.navigate(
          'Home',

          {
            // SEND LOGGED-IN USER DATA
            user: res.data.user
          }
        );

      }

      // IF ACCOUNT IS WAITING FOR APPROVAL
      else if (res.data.status === 'pending') {

        Alert.alert(
          "Pending Approval",
          "Your account is waiting for admin approval."
        );

      }

      // INVALID LOGIN
      else {

        Alert.alert(
          "Login Failed",
          "Invalid email or password"
        );
      }

    })

    // CATCH API ERRORS
    .catch(err => {

      console.log("LOGIN ERROR:", err);

    });
  };

  return (

    <View style={styles.container}>

      {/* LOGIN CARD */}
      <View style={styles.card}>

        {/* APP TITLE */}
        <Text style={styles.title}>
          Elder Care Matters
        </Text>

        {/* EMAIL INPUT */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD INPUT */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >

          <Text style={styles.buttonText}>
            Login
          </Text>

        </TouchableOpacity>

        {/* GO TO REGISTER SCREEN */}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate('Register')}
        >

          Create Account

        </Text>

      </View>

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  // MAIN SCREEN
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding: 20
  },

  // LOGIN CARD DESIGN
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    elevation: 5
  },

  // TITLE DESIGN
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333'
  },

  // INPUT DESIGN
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  // BUTTON DESIGN
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 12,
    marginTop: 5
  },

  // BUTTON TEXT DESIGN
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  // REGISTER LINK DESIGN
  link: {
    marginTop: 15,
    textAlign: 'center',
    color: '#333'
  }

});