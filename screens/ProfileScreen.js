// IMPORT REACT + useState FOR MANAGING SCREEN DATA
import React, { useState } from 'react';

// IMPORT REACT NATIVE COMPONENTS
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView
} from 'react-native';

// IMPORT IMAGE PICKER
import * as ImagePicker from 'expo-image-picker';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT FORM DATA
import FormData from 'form-data';

// EXPORT PROFILE SCREEN COMPONENT
export default function ProfileScreen({ route }) {

  // GET USER DATA
  const { user } = route.params;

  // STATES
  const [name, setName] = useState(user.name);

  const [role, setRole] = useState(user.role);

  const [age, setAge] = useState(
    user.age ? String(user.age) : ''
  );

  const [location, setLocation] = useState(
    user.location || ''
  );

  const [image, setImage] = useState(
    user.image || ''
  );

  const [bio, setBio] = useState(
    user.bio || ''
  );

  // GENDER
  const [gender, setGender] = useState(
    user.gender || ''
  );

  // BIRTH DATE
  const [birthDate, setBirthDate] = useState(
    user.birth_date || ''
  );

  // PICK IMAGE
  const pickImage = async () => {

    let result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        aspect: [1, 1],

        quality: 1
      });

    if (!result.canceled) {

      const selectedImage =
        result.assets[0];

      setImage(selectedImage.uri);

      const formData = new FormData();

      formData.append(
        'user_id',
        user.id
      );

      formData.append('image', {

        uri: selectedImage.uri,
        name: 'profile.jpg',
        type: 'image/jpeg'

      });

      axios.post(
        'http://192.168.0.216/eldercare-api/upload_image.php',

        formData,

        {
          headers: {
            'Content-Type':
              'multipart/form-data'
          }
        }
      )

      .then(res => {

        console.log(
          "UPLOAD RESPONSE:",
          res.data
        );

        if (res.data.image) {

          setImage(res.data.image);
        }

        Alert.alert(
          "Success",
          "Profile image updated!"
        );

      })

      .catch(err => {

        console.log(
          "UPLOAD ERROR:",
          err
        );

        Alert.alert(
          "Error",
          "Image upload failed"
        );
      });
    }
  };

  // UPDATE PROFILE
  const handleUpdate = () => {

    axios.post(
      'http://192.168.0.216/eldercare-api/update_profile.php',

      {
        id: user.id,
        name,
        role,
        image,
        bio,
        age: parseInt(age) || 0,
        location
      }
    )

    .then(() => {

      Alert.alert(
        "Success",
        "Profile updated!"
      );

    })

    .catch(err => {

      console.log(err);

    });
  };

  return (

    <ScrollView
      contentContainerStyle={styles.container}
    >

      {/* TITLE */}
      <Text style={styles.title}>
        My Profile
      </Text>

      {/* PROFILE IMAGE */}
      <Image
        source={{
          uri:
            image ||
            'https://via.placeholder.com/150'
        }}

        style={styles.avatar}
      />

      {/* CHANGE PHOTO */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={pickImage}
      >

        <Text style={styles.uploadText}>
          Change Profile Picture
        </Text>

      </TouchableOpacity>

      {/* NAME */}
      <Text style={styles.label}>
        Name
      </Text>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={true}
      />

      {/* ROLE */}
      <Text style={styles.label}>
        Role
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.disabledInput
        ]}

        value={role}

        editable={false}
      />

      {/* GENDER */}
      <Text style={styles.label}>
        Gender
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.disabledInput
        ]}

        value={gender}

        editable={false}
      />

      {/* BIRTH DATE */}
      <Text style={styles.label}>
        Birth Date
      </Text>

      <TextInput
        style={[
          styles.input,
          styles.disabledInput
        ]}

        value={birthDate}

        editable={false}
      />

      {/* AGE */}
      <Text style={styles.label}>
        Age
      </Text>

      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        editable={true}
      />

      {/* LOCATION */}
      <Text style={styles.label}>
        Location
      </Text>

      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        editable={true}
      />

      {/* BIO */}
      <Text style={styles.label}>
        Bio
      </Text>

      <TextInput
        style={styles.bioInput}
        value={bio}
        onChangeText={setBio}
        multiline
        editable={true}
      />

      {/* UPDATE BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleUpdate}
      >

        <Text style={styles.buttonText}>
          Update Profile
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F7FA'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 30
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignSelf: 'center',
    marginBottom: 15
  },

  uploadButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },

  uploadText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    marginLeft: 4
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    color: '#000'
  },

  disabledInput: {
    backgroundColor: '#E5E5E5'
  },

  bioInput: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
    height: 100,
    textAlignVertical: 'top',
    color: '#000'
  },

  button: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    marginTop: 5
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});