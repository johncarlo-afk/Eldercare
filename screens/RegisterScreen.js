// IMPORT REACT + STATE HOOK
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false);

  // STORE USER ROLE
  const [role, setRole] = useState('Senior');

  // STORE USER IMAGE
  const [image, setImage] = useState('');

  // STORE USER GENDER
  const [gender, setGender] = useState('Male');

  // STORE USER BIRTH DATE
  const [birthDate, setBirthDate] = useState('');

  // DATE PICKER
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [date, setDate] = useState(new Date());

  // STORE VALID ID IMAGE
  const [validId, setValidId] = useState('');

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

  // PICK VALID ID IMAGE
  const pickValidId = async () => {

    let result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        quality: 1
      });

    // IF USER SELECTED IMAGE
    if (!result.canceled) {

      setValidId(result.assets[0].uri);
    }
  };

  // FUNCTION TO REGISTER USER
  // FUNCTION TO REGISTER USER
  const handleRegister = async () => {

    // CHECK IF THERE ARE EMPTY FIELDS
    if (
      !name ||
      !age ||
      !bio ||
      !location ||
      !email ||
      !password ||
      !role ||
      !gender ||
      !birthDate ||
      !validId ||
      !image
    ) {

      Alert.alert(
        "Error",
        "Please fill all fields"
      );

      return;
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // CHECK EMAIL FORMAT
    if (!emailRegex.test(email)) {

      Alert.alert(
        "Invalid Email",
        "Please enter a valid email address"
      );

      return;
    }

    // PASSWORD LENGTH VALIDATION
    if (password.length < 6) {

      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters"
      );

      return;
    }

    try {

      // CREATE FORM DATA
      const formData = new FormData();

      // APPEND TEXT DATA
      formData.append('name', name);
      formData.append('age', age);
      formData.append('bio', bio);
      formData.append('location', location);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      formData.append('gender', gender);
      formData.append('birth_date', birthDate);

      // APPEND VALID ID IMAGE
      formData.append('valid_id', {

        uri: validId,
        name: 'valid_id.jpg',
        type: 'image/jpeg'

      });

      // APPEND IMAGE FILE
      formData.append('image', {

        uri: image,
        name: 'profile.jpg',
        type: 'image/jpeg'

      });

      // SEND DATA TO API
      const res = await axios.post(

        'http://192.168.0.216/eldercare-api/register.php',

        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

      );

      console.log(res.data);

      // EMAIL EXISTS
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

    } catch (err) {

      console.log("REGISTER ERROR:", err);

      Alert.alert(
        "Error",
        "Registration failed"
      );
    }
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
            'rgba(255, 255, 255, 1)',
            'transparent',
            'rgba(255,255,255,1)'
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

            {
              image ? (
                <Image
                  source={{ uri: image }}
                  style={styles.profileImage}
                />
              ) : (
                <View style={styles.profilePlaceholder}>
                  <Text style={styles.uploadText}>
                    Upload Profile Photo
                  </Text>
                </View>
              )
            }

          </TouchableOpacity>

          {/* VALID ID UPLOAD */}
          <TouchableOpacity
            style={styles.validIdContainer}
            onPress={pickValidId}
          >

            {
              validId ? (

                <Image
                  source={{ uri: validId }}
                  style={styles.validIdImage}
                />

              ) : (

                <View style={styles.validIdPlaceholder}>

                  <Text style={styles.validIdText}>
                    Upload Valid ID
                  </Text>

                </View>
              )
            }

          </TouchableOpacity>

          {/* FULL NAME INPUT */}
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#666"
            style={styles.input}
            onChangeText={setName}
          />

          {/* AGE INPUT */}
          <TextInput
            placeholder="Age"
            placeholderTextColor="#666"
            keyboardType="numeric"
            style={styles.input}
            onChangeText={setAge}
          />

          {/* GENDER PICKER */}
          <View style={styles.pickerContainer}>

            <Picker
              selectedValue={gender}
              dropdownIconColor="#000"
              style={styles.picker}
              onValueChange={(itemValue) =>
                setGender(itemValue)
              }
            >

              <Picker.Item
                label="Male"
                value="Male"
              />

              <Picker.Item
                label="Female"
                value="Female"
              />

            </Picker>

          </View>

          {/* BIRTH DATE PICKER */}
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >

            <Text
              style={{
                color: birthDate ? '#000' : '#666',
                fontSize: 16
              }}
            >
              {
                birthDate
                  ? birthDate
                  : 'Select Birth Date'
              }
            </Text>

          </TouchableOpacity>

          {
            showDatePicker && (

              <DateTimePicker
                value={date}
                mode="date"
                display="default"

                onChange={(event, selectedDate) => {

                  setShowDatePicker(false);

                  if (selectedDate) {

                    setDate(selectedDate);

                    // FORMAT DATE
                    const formattedDate =
                      selectedDate
                        .toISOString()
                        .split('T')[0];

                    setBirthDate(formattedDate);
                  }
                }}
              />

            )
          }

          {/* LOCATION INPUT */}
          <TextInput
            placeholder="Location"
            placeholderTextColor="#666"
            style={styles.input}
            onChangeText={setLocation}
          />

          {/* EMAIL INPUT */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          {/* PASSWORD INPUT */}
          <View style={styles.passwordContainer}>

            <TextInput
              placeholder="Password"
              placeholderTextColor="#666"
              secureTextEntry={!showPassword}
              style={styles.passwordInput}
              onChangeText={setPassword}
              minLength={6}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
            >

              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="#666"
              />

            </TouchableOpacity>

          </View>

          {/* BIO INPUT */}
          <TextInput
            placeholder="Short Bio"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            style={styles.bioInput}
            onChangeText={setBio}
          />

          {/* ROLE PICKER */}
          <View style={styles.pickerContainer}>

            <Picker
              selectedValue={role}
              dropdownIconColor="#000"
              style={styles.picker}
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
    borderRadius: 60
  },

  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },

  uploadText: {
    color: '#2196F3',
    fontWeight: 'bold',
    textAlign: 'center'
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

  // INPUT FIELD DESIGN
  input: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    color: '#000'
  },

  // BIO INPUT DESIGN
  bioInput: {
    backgroundColor: '#F0F0F0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    height: 100,
    textAlignVertical: 'top',
    color: '#000'
  },

  // DROPDOWN CONTAINER DESIGN
  pickerContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    color: '#000'
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
  },

  passwordContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },

  passwordInput: {
    flex: 1,
    paddingVertical: 15,
    color: '#000',
    fontSize: 16
  },

  picker: {
    color: '#000'
  },

  validIdContainer: {
    alignItems: 'center',
    marginBottom: 20
  },

  validIdImage: {
    width: '100%',
    height: 180,
    borderRadius: 15
  },

  validIdPlaceholder: {
    width: '100%',
    height: 180,
    backgroundColor: '#F0F0F0',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },

  validIdText: {
    color: '#2196F3',
    fontWeight: 'bold',
    fontSize: 16
  },

});