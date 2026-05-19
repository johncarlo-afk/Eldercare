// IMPORT REACT + useState FOR MANAGING SCREEN DATA
import React, { useState } from 'react';

// IMPORT REACT NATIVE COMPONENTS
import {
  View,              // CONTAINER VIEW
  Text,              // DISPLAY TEXT
  StyleSheet,        // CREATE STYLES
  TextInput,         // INPUT FIELD
  TouchableOpacity, // CLICKABLE BUTTON
  Image,             // DISPLAY IMAGE
  Alert,             // SHOW POPUP ALERT
  ScrollView         // ALLOW SCROLLING
} from 'react-native';

// IMPORT IMAGE PICKER FOR SELECTING IMAGES FROM GALLERY
import * as ImagePicker from 'expo-image-picker';

// IMPORT AXIOS FOR API REQUESTS
import axios from 'axios';

// IMPORT FOR IMAGE FORM DATA UPLOAD
import FormData from 'form-data';

// EXPORT PROFILE SCREEN COMPONENT
export default function ProfileScreen({ route }) {

  // GET LOGGED-IN USER DATA FROM NAVIGATION
  const { user } = route.params;

  // STORE USER NAME
  const [name, setName] = useState(user.name);

  // STORE USER ROLE
  const [role, setRole] = useState(user.role);

  // STORE USER AGE
  const [age, setAge] = useState(
    user.age ? String(user.age) : ''
  );

  // STORE USER LOCATION
  const [location, setLocation] = useState(
    user.location || ''
  );

  // STORE USER PROFILE IMAGE
  const [image, setImage] = useState(
    user.image || ''
  );

  // STORE USER BIO
  const [bio, setBio] = useState(
    user.bio || ''
  );

  // DISABLE EDITING IF USER ROLE IS SENIOR
  const isEditable = user.role !== 'Senior';

  // FUNCTION TO PICK IMAGE AND UPLOAD IT
  const pickImage = async () => {

    // OPEN PHONE GALLERY
    let result = await ImagePicker.launchImageLibraryAsync({

      // ALLOW IMAGE FILES ONLY
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      // ALLOW USER TO CROP IMAGE
      allowsEditing: true,

      // IMAGE RATIO 1:1
      aspect: [1, 1],

      // IMAGE QUALITY
      quality: 1

    });

    // CHECK IF USER DID NOT CANCEL
    if (!result.canceled) {

      // GET SELECTED IMAGE
      const selectedImage = result.assets[0];

      // UPDATE IMAGE PREVIEW IMMEDIATELY
      setImage(selectedImage.uri);

      // CREATE FORM DATA FOR IMAGE UPLOAD
      const formData = new FormData();

      // SEND USER ID TO SERVER
      formData.append('user_id', user.id);

      // APPEND IMAGE FILE
      formData.append('image', {

        // IMAGE FILE LOCATION
        uri: selectedImage.uri,

        // IMAGE FILE NAME
        name: 'profile.jpg',

        // IMAGE FILE TYPE
        type: 'image/jpeg'

      });

      // SEND IMAGE TO PHP SERVER
      axios.post(

        // PHP API URL
        'http://192.168.0.216/eldercare-api/upload_image.php',

        // SEND FORM DATA
        formData,

        // REQUEST HEADERS
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

      )

      // IF UPLOAD SUCCESS
      .then(res => {

        // DISPLAY SERVER RESPONSE
        console.log("UPLOAD RESPONSE:", res.data);

        // UPDATE IMAGE USING SERVER URL
        if (res.data.image) {
          setImage(res.data.image);
        }

        // SHOW SUCCESS ALERT
        Alert.alert(
          "Success",
          "Profile image updated!"
        );

      })

      // IF UPLOAD FAILED
      .catch(err => {

        // DISPLAY ERROR IN CONSOLE
        console.log("UPLOAD ERROR:", err);

        // SHOW ERROR ALERT
        Alert.alert(
          "Error",
          "Image upload failed"
        );
      });
    }
  };

  // FUNCTION TO UPDATE PROFILE
  const handleUpdate = () => {

    // SEND UPDATED DATA TO SERVER
    axios.post(

      // PHP API URL
      'http://192.168.0.216/eldercare-api/update_profile.php',

      // DATA TO SEND
      {
        id: user.id,                 // USER ID
        name,                        // USER NAME
        role,                        // USER ROLE
        image,                       // PROFILE IMAGE
        bio,                         // USER BIO
        age: parseInt(age) || 0,     // USER AGE
        location                     // USER LOCATION
      }
    )

    // IF UPDATE SUCCESS
    .then(() => {

      // SHOW SUCCESS MESSAGE
      Alert.alert(
        "Success",
        "Profile updated!"
      );

    })

    // IF UPDATE FAILED
    .catch(err => {

      // SHOW ERROR IN CONSOLE
      console.log(err);

    });
  };

  // SCREEN UI
  return (

    // SCROLLABLE SCREEN
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      {/* SCREEN TITLE */}
      <Text style={styles.title}>
        My Profile
      </Text>

      {/* DISPLAY PROFILE IMAGE */}
      <Image
        source={{
          uri: image || 'https://via.placeholder.com/150'
        }}
        style={styles.avatar}
      />

      {/* BUTTON TO PICK IMAGE */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={pickImage}
      >

        {/* BUTTON TEXT */}
        <Text style={styles.uploadText}>
          Change Profile Picture
        </Text>

      </TouchableOpacity>

      {/* NAME INPUT */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={isEditable}
        placeholder="Name"
      />

      {/* ROLE INPUT */}
      <TextInput
        style={styles.input}
        value={role}
        editable={false}
      />

      {/* AGE INPUT */}
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
        editable={isEditable}
      />

      {/* LOCATION INPUT */}
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        editable={isEditable}
      />

      {/* BIO INPUT */}
      <TextInput
        style={styles.bioInput}
        value={bio}
        onChangeText={setBio}
        placeholder="Write something about you..."
        multiline
        editable={isEditable}
      />

      {/* UPDATE PROFILE BUTTON */}
      <TouchableOpacity
        style={[
          styles.button,

          // CHANGE BUTTON COLOR IF DISABLED
          !isEditable && { backgroundColor: '#ccc' }
        ]}

        // RUN UPDATE FUNCTION
        onPress={handleUpdate}

        // DISABLE BUTTON IF USER CANNOT EDIT
        disabled={!isEditable}
      >

        {/* BUTTON LABEL */}
        <Text style={styles.buttonText}>

          {isEditable
            ? "Update Profile"
            : "Editing Disabled"}

        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

// SCREEN STYLES
const styles = StyleSheet.create({

  // MAIN CONTAINER STYLE
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F7FA'
  },

  // TITLE STYLE
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30
  },

  // PROFILE IMAGE STYLE
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 15
  },

  // UPLOAD BUTTON STYLE
  uploadButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },

  // UPLOAD BUTTON TEXT STYLE
  uploadText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  
  // INPUT FIELD STYLE
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14
  },

  // BIO INPUT STYLE
  bioInput: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    height: 100,
    textAlignVertical: 'top'
  },

  // BUTTON STYLE
  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    marginTop: 5
  },

  // BUTTON TEXT STYLE
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});