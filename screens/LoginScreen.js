// IMPORT REACT + STATE HOOK
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
// IMPORT UI COMPONENTS
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  ImageBackground
} from 'react-native';

// IMPORT AXIOS
import axios from 'axios';

// LOGIN SCREEN
export default function LoginScreen({ navigation }) {

  // STATES
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // LOGIN FUNCTION
  const handleLogin = () => {

    if (!email || !password) {

      Alert.alert(
        "Error",
        "Please enter email and password"
      );

      return;
    }

    axios.post(
      'https://lightcoral-armadillo-536796.hostingersite.com/eldercare-api/login.php',

      {
        email,
        password
      }
    )

    .then(res => {

      console.log(res.data);

      if (res.data.status === 'success') {

        navigation.navigate(
          'Home',
          {
            user: res.data.user
          }
        );

      } else if (res.data.status === 'pending') {

        Alert.alert(
          "Pending Approval",
          "Your account is waiting for admin approval."
        );

      } else {

        Alert.alert(
          "Login Failed",
          "Invalid email or password"
        );
      }

    })

    .catch(err => {

      console.log(err);

      Alert.alert(
        "Error",
        "Something went wrong"
      );
    });
  };

  return (

    <View style={styles.container}>

      <StatusBar
        backgroundColor="#EAF4FF"
        barStyle="dark-content"
      />

      {/* TOP IMAGE */}
      <ImageBackground

        source={require('../assets/elder1.jpg')}

        style={styles.topImage}
      >

        {/* BOTTOM GRADIENT */}
        <LinearGradient

          colors={[
            'rgba(255, 255, 255, 1)',   // TOP DARK
            'transparent',        // CENTER
            'rgba(255,255,255,1)' // BOTTOM WHITE
          ]}

          locations={[0, 0.45, 1]}

          style={styles.gradient}
        >

          <Text style={styles.heading}>
            ElderCare Matter
          </Text>

          <Text style={styles.subheading}>
            Safe companionship and care for seniors
          </Text>

        </LinearGradient>

      </ImageBackground>

      {/* LOGIN CARD */}
      <View style={styles.card}>

        {/* EMAIL */}
        <TextInput
          placeholder="Enter Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Enter Password"
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

        {/* REGISTER LINK */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Register')
          }
        >

          <Text style={styles.link}>
            Create New Account
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAF4FF'
  },

  logo: {
    fontSize: 60,
    textAlign: 'center'
  },

  heading: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1E3A5F'
  },

  subheading: {
    color: '#1E3A5F',
    marginTop: 8,
    fontSize: 15,
    lineHeight: 22
  },

  topImage: {
    height: 280,
    width: '100%',
    justifyContent: 'flex-end',
    overflow: 'hidden',
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1
  },

  gradient: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-end'
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    padding: 25,
    marginTop: 1,
    elevation: 5
  },

  input: {
    backgroundColor: '#F5F7FA',
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    fontSize: 16,
    color: '#333'
  },

  button: {
    backgroundColor: '#4A90E2',
    padding: 18,
    borderRadius: 16,
    marginTop: 5
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18
  },

  link: {
    textAlign: 'center',
    marginTop: 20,
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '600'
  }

});