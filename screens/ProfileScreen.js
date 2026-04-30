import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  TouchableOpacity, Image, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ProfileScreen({ route }) {

  const { user } = route.params;

  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [age, setAge] = useState(user.age ? String(user.age) : '');
  const [location, setLocation] = useState(user.location || '');
  const [image, setImage] = useState(user.image || '');
  const [bio, setBio] = useState(user.bio || '');

  // ⭐ rating display only (for now)
  const rating = user.rating || 4.5;

  // 📸 PICK IMAGE
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🔒 DISABLE EDITING FOR SENIOR (example rule)
  const isEditable = user.role !== 'Senior';

  const handleUpdate = () => {
    axios.post('http://192.168.0.216/eldercare-api/update_profile.php', {
        id: user.id,
        name,
        role,
        image,
        bio,
        age: parseInt(age) || 0,
        location
    })
    .then(() => {
      Alert.alert("Success", "Profile updated!");
    })
    .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>My Profile</Text>

      {/* IMAGE */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: image || 'https://via.placeholder.com/150' }}
          style={styles.avatar}
        />
        <Text style={styles.changePhoto}>Change Photo</Text>
      </TouchableOpacity>

      {/* ⭐ RATING */}
      <Text style={styles.rating}>⭐ {rating}</Text>

      {/* NAME */}
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        editable={isEditable}
        placeholder="Name"
      />

      {/* ROLE */}
      <TextInput
        style={styles.input}
        value={role}
        onChangeText={setRole}
        editable={false} // usually fixed
      />
      {/* AGE */}
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        placeholder="Age"
        keyboardType="numeric"
        editable={isEditable}
        />

        {/* LOCATION */}
        <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Location"
        editable={isEditable}
        />

      {/* BIO */}
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={bio}
        onChangeText={setBio}
        placeholder="Write something about you..."
        multiline
        editable={isEditable}
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.button, !isEditable && { backgroundColor: '#ccc' }]}
        onPress={handleUpdate}
        disabled={!isEditable}
      >
        <Text style={styles.buttonText}>
          {isEditable ? "Update Profile" : "Editing Disabled"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center'
  },

  changePhoto: {
    textAlign: 'center',
    color: '#FF4081',
    marginBottom: 10
  },

  rating: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 15
  },

  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }

});