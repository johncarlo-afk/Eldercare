 // IMPORT REACT + STATE HOOK
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
// IMPORT REACT NATIVE COMPONENTS
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ImageBackground,
  Image
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

  const [image, setImage] = useState('');

  // PICK PROFILE IMAGE
const pickImage = async () => {

    // OPEN GALLERY
    let result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        aspect: [1, 1],

        quality: 1
      });

    // IF USER SELECTED IMAGE
    if (!result.canceled) {

      // SAVE IMAGE URI
      setImage(result.assets[0].uri);
    }
  };

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
      !role  ||
      !image
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
        role: role,
        // SEND USER IMAGE
        image: image
      }
    )

    // IF REQUEST SUCCESS
    .then(res => {

      console.log(res.data);

      // EMAIL ALREADY EXISTS
      if (res.data.status === "exists") {

        Alert.alert(
          "Email Exists",
          "This email is already registered"
        );

        return;
      }

      // SUCCESS
      if (res.data.status === "success") {

        Alert.alert(
          "Success",
          "Account created successfully!"
        );

        navigation.navigate('Login');
      }

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

    <View style={{ flex: 1, backgroundColor: '#EAF4FF' }}>

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

          {/* TITLE */}
          <Text style={styles.heroTitle}>
            Create Account
          </Text>

          {/* SUBTITLE */}
          <Text style={styles.heroSubtitle}>
            Join ElderCare Matter today
          </Text>

        </LinearGradient>

      </ImageBackground>

      {/* FORM */}
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        {/* REGISTER CARD */}
        <View style={styles.card}>

          {/* PROFILE IMAGE */}
            <TouchableOpacity
              style={styles.imagePicker}
              onPress={pickImage}
            >
              <Text style={styles.uploadText}>
                Upload Profile Photo
              </Text>

            </TouchableOpacity>

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

          {/* ROLE PICKER */}
          <View style={styles.pickerContainer}>

            <Picker
              selectedValue={role}
              onValueChange={(itemValue) =>
                setRole(itemValue)
              }
            >

              <Picker.Item
                label="Senior"
                value="Senior"
              />

              <Picker.Item
                label="Caregiver"
                value="Caregiver"
              />

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

    </View>
  );
}

// SCREEN STYLES
const styles = StyleSheet.create({

  imagePicker: {
    alignItems: 'center',
    marginBottom: 20
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0'
  },

  uploadText: {
    marginTop: 10,
    color: '#2196F3',
    fontWeight: 'bold'
  },

  topImage: {
    height: 260,
    width: '100%',
    justifyContent: 'flex-end'
  },

  gradient: {
    flex: 1,
    padding: 25,
    justifyContent: 'flex-end'
  },

  heroTitle: {
    color: '#1E3A5F',
    fontSize: 34,
    fontWeight: 'bold'
  },

  heroSubtitle: {
    color: '#1E3A5F',
    marginTop: 8,
    fontSize: 15
  },

  // MAIN CONTAINER
  container: {
    flexGrow: 1,
    marginTop: 1
  },

  // REGISTER CARD DESIGN
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 25,
    marginTop: -20
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