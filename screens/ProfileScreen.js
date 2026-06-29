// IMPORT REACT
import React, { useState } from 'react';

// IMPORT COMPONENTS
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// IMAGE PICKER
import * as ImagePicker from 'expo-image-picker';

// AXIOS
import axios from 'axios';

// FORM DATA
import FormData from 'form-data';

// EXPORT SCREEN
export default function ProfileScreen({ route }) {

  // USER DATA
  const { user } = route.params;

  // BASIC
  const [name, setName] = useState(user.name || '');
  const [role] = useState(user.role || '');
  const [location, setLocation] = useState(user.location || '');
  const [image, setImage] = useState(user.image || '');
  const [bio, setBio] = useState(user.bio || '');
  const [gender] = useState(user.gender || '');
  const [birthDate] = useState(user.birth_date || '');

  // SENIOR
  const [seniorCondition, setSeniorCondition] =
    useState(user.senior_condition || '');

  const [emergencyContact, setEmergencyContact] =
    useState(user.emergency_contact || '');

  const [medication, setMedication] =
    useState(user.medication || '');

  // CAREGIVER
  const [caregiverExperience, setCaregiverExperience] =
    useState(user.caregiver_experience || '');

  const [caregiverSpecialization, setCaregiverSpecialization] =
    useState(user.caregiver_specialization || '');

  // VOLUNTEER
  const [volunteerHeight, setVolunteerHeight] =
    useState(user.volunteer_height || '');

  const [volunteerWeight, setVolunteerWeight] =
    useState(user.volunteer_weight || '');

  const [volunteerSkills, setVolunteerSkills] =
    useState(user.volunteer_skills || '');

  const [volunteerAvailability, setVolunteerAvailability] =
    useState(user.volunteer_availability || '');

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

        if (res.data.image) {

          setImage(res.data.image);
        }

        Alert.alert(
          "Success",
          "Profile image updated!"
        );

      })

      .catch(err => {

        console.log(err);

        Alert.alert(
          "Error",
          "Image upload failed"
        );
      });
    }
  };

  // UPDATE PROFILE
  const handleUpdate = () => {

    console.log({
      id: user.id,
      name,
      role,
      image,
      bio,
      location
    });

    axios.post(
      'http://192.168.0.216/eldercare-api/update_profile.php',

      {
        id: user.id,

        // BASIC
        name,
        role,
        image,
        bio,
        location,
        gender,
        birth_date: birthDate,

        // SENIOR
        senior_condition: seniorCondition || '',
        emergency_contact: emergencyContact || '',
        medication: medication || '',

        // CAREGIVER
        caregiver_experience:
          caregiverExperience || '',

        caregiver_specialization:
          caregiverSpecialization || '',

        // VOLUNTEER
        volunteer_height:
          volunteerHeight || '',

        volunteer_weight:
          volunteerWeight || '',

        volunteer_skills:
          volunteerSkills || '',

        volunteer_availability:
          volunteerAvailability || ''
      },

      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    .then(res => {

      console.log(
        "UPDATE RESPONSE:",
        res.data
      );

      // CHECK STATUS
      if (res.data.status === "success") {

        Alert.alert(
          "Success",
          "Profile updated!"
        );

      } else {

        Alert.alert(
          "Error",
          res.data.message || "Update failed"
        );
      }

    })

    .catch(err => {

      console.log(
        "UPDATE ERROR:",
        err.response?.data || err
      );

      Alert.alert(
        "Error",
        "Server error"
      );
    });
  };

  return (

    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >

        {/* TITLE */}
        <Text style={styles.title}>
          My Profile
        </Text>

        {/* IMAGE */}
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
        <Text style={styles.label}>Name</Text>

        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* ROLE */}
        <Text style={styles.label}>Role</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={role}
          editable={false}
        />

        {/* GENDER */}
        <Text style={styles.label}>Gender</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={gender}
          editable={false}
        />

        {/* BIRTH DATE */}
        <Text style={styles.label}>Birth Date</Text>

        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={birthDate}
          editable={false}
        />

        {/* LOCATION */}
        <Text style={styles.label}>Location</Text>

        <TextInput
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />

        {/* BIO */}
        <Text style={styles.label}>Bio</Text>

        <TextInput
          style={styles.bioInput}
          value={bio}
          onChangeText={setBio}
          multiline
        />

        {/* SENIOR */}
        {
          role === 'Senior' && (
            <>

              <Text style={styles.label}>
                Medical Condition
              </Text>

              <TextInput
                style={styles.input}
                value={seniorCondition}
                onChangeText={setSeniorCondition}
              />

              <Text style={styles.label}>
                Emergency Contact
              </Text>

              <TextInput
                style={styles.input}
                value={emergencyContact}
                onChangeText={setEmergencyContact}
              />

              <Text style={styles.label}>
                Medication
              </Text>

              <TextInput
                style={styles.input}
                value={medication}
                onChangeText={setMedication}
              />

            </>
          )
        }

        {/* CAREGIVER */}
        {
          role === 'Caregiver' && (
            <>

              <Text style={styles.label}>
                Experience
              </Text>

              <TextInput
                style={styles.input}
                value={caregiverExperience}
                onChangeText={setCaregiverExperience}
              />

              <Text style={styles.label}>
                Specialization
              </Text>

              <TextInput
                style={styles.input}
                value={caregiverSpecialization}
                onChangeText={setCaregiverSpecialization}
              />

            </>
          )
        }

        {/* VOLUNTEER */}
        {
          role === 'Volunteer' && (
            <>

              <Text style={styles.label}>
                Height
              </Text>

              <TextInput
                style={styles.input}
                value={volunteerHeight}
                onChangeText={setVolunteerHeight}
              />

              <Text style={styles.label}>
                Weight
              </Text>

              <TextInput
                style={styles.input}
                value={volunteerWeight}
                onChangeText={setVolunteerWeight}
              />

              <Text style={styles.label}>
                Skills
              </Text>

              <TextInput
                style={styles.input}
                value={volunteerSkills}
                onChangeText={setVolunteerSkills}
              />

              <Text style={styles.label}>
                Availability
              </Text>

              <TextInput
                style={styles.input}
                value={volunteerAvailability}
                onChangeText={setVolunteerAvailability}
              />

            </>
          )
        }

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdate}
        >

          <Text style={styles.buttonText}>
            Update Profile
          </Text>

        </TouchableOpacity>

      </ScrollView>

    </KeyboardAvoidingView>
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