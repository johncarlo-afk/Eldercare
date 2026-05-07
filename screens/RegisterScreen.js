 // IMPORT REACT + STATE HOOK
import React, { useState } from 'react';

// IMPORT REACT NATIVE COMPONENTS
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';

// IMPORT AXIOS FOR API REQUESTS
import axios from 'axios';

// IMPORT DROPDOWN PICKER
import { Picker } from '@react-native-picker/picker';

// REGISTER SCREEN COMPONENT
export default function RegisterScreen({ navigation }) {

  // STORE USER NAME
  const [name, setName] = useState('');

  // STORE USER AGE
  const [age, setAge] = useState('');

  // STORE USER BIO
  const [bio, setBio] = useState('');

  // STORE USER LOCATION
  const [location, setLocation] = useState('');

  // STORE USER EMAIL
  const [email, setEmail] = useState('');

  // STORE USER PASSWORD
  const [password, setPassword] = useState('');

  // STORE USER ROLE
  const [role, setRole] = useState('Senior');

  // FUNCTION TO REGISTER USER
  const handleRegister = () => {

    // CHECK IF THERE ARE EMPTY FIELDS
    if (
      !name ||
      !age ||
      !bio ||
      !location ||
      !email ||
      !password ||
      !role
    ) {

      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;
    }

    // EMAIL FORMAT VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // CHECK IF EMAIL IS VALID
    if (!emailRegex.test(email)) {

      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address"
      );

      return;
    }

    // SEND USER DATA TO REGISTER API
    axios.post(
      'http://192.168.0.216/eldercare-api/register.php',

      {
        // SEND USER NAME
        name: name,

        // SEND USER AGE
        age: parseInt(age),

        // SEND USER BIO
        bio: bio,

        // SEND USER LOCATION
        location: location,

        // SEND USER EMAIL
        email: email,

        // SEND USER PASSWORD
        password: password,

        // SEND USER ROLE
        role: role
      }
    )

    // IF REQUEST SUCCESS
    .then(res => {

      // SHOW API RESPONSE
      console.log(res.data);

      // SHOW SUCCESS MESSAGE
      Alert.alert(
        "Success",
        "Account created successfully!"
      );

      // GO BACK TO LOGIN SCREEN
      navigation.navigate('Login');

    })

    // IF REQUEST FAILED
    .catch(err => {

      // SHOW ERROR IN CONSOLE
      console.log("REGISTER ERROR:", err);

      // SHOW ERROR ALERT
      Alert.alert(
        "Error",
        "Registration failed"
      );
    });
  };

  return (

    // ALLOW SCROLLING
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* REGISTER CARD */}
      <View style={styles.card}>

        {/* SCREEN TITLE */}
        <Text style={styles.title}>
          Create Account
        </Text>

        {/* FULL NAME INPUT */}
        <TextInput
          placeholder="Full Name"
          style={styles.input}
          onChangeText={setName}
        />

        {/* AGE INPUT */}
        <TextInput
          placeholder="Age"
          keyboardType="numeric"
          style={styles.input}
          onChangeText={setAge}
        />

        {/* LOCATION INPUT */}
        <TextInput
          placeholder="Location"
          style={styles.input}
          onChangeText={setLocation}
        />

        {/* EMAIL INPUT */}
        <TextInput
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        {/* PASSWORD INPUT */}
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        {/* BIO INPUT */}
        <TextInput
          placeholder="Short Bio"
          multiline
          numberOfLines={4}
          style={styles.bioInput}
          onChangeText={setBio}
        />

        {/* ROLE DROPDOWN CONTAINER */}
        <View style={styles.pickerContainer}>

          {/* ROLE DROPDOWN */}
          <Picker
            selectedValue={role}

            // CHANGE ROLE VALUE
            onValueChange={(itemValue) =>
              setRole(itemValue)
            }
          >

            {/* SENIOR OPTION */}
            <Picker.Item
              label="Senior"
              value="Senior"
            />

            {/* CAREGIVER OPTION */}
            <Picker.Item
              label="Caregiver"
              value="Caregiver"
            />

            {/* VOLUNTEER OPTION */}
            <Picker.Item
              label="Volunteer"
              value="Volunteer"
            />

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

// SCREEN STYLES
const styles = StyleSheet.create({

  // MAIN CONTAINER
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    padding: 20
  },

  // REGISTER CARD DESIGN
  card: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    elevation: 5
  },

  // TITLE DESIGN
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
    color: '#333'
  },

  // INPUT FIELD DESIGN
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15
  },

  // BIO INPUT DESIGN
  bioInput: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top'
  },

  // DROPDOWN CONTAINER DESIGN
  pickerContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden'
  },

  // BUTTON DESIGN
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12
  },

  // BUTTON TEXT DESIGN
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});