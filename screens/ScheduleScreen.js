// IMPORT REACT
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

// EXPORT SCREEN
export default function ScheduleScreen({ route, navigation }) {

  // GET USERS FROM PREVIOUS SCREEN
  const { currentUser, matchedUser } = route.params;

  // STORE DATE INPUT
  const [meetingDate, setMeetingDate] = useState('');

  // STORE TIME INPUT
  const [meetingTime, setMeetingTime] = useState('');

  // STORE LOCATION INPUT
  const [meetingLocation, setMeetingLocation] = useState('');

  // STORE NOTES INPUT
  const [notes, setNotes] = useState('');

  // CREATE SCHEDULE FUNCTION
  const handleCreateSchedule = () => {

    // CHECK IF FIELDS ARE EMPTY
    if (!meetingDate || !meetingTime || !meetingLocation) {

      Alert.alert(
        'Error',
        'Please fill all schedule fields'
      );

      return;
    }

    // SEND DATA TO PHP API
    axios.post(
      'https://lightcoral-armadillo-536796.hostingersite.com/eldercare-api/create_schedule.php',

      {
        senior_id:
          currentUser.role === 'Senior'
            ? currentUser.id
            : matchedUser.id,

        partner_id:
          currentUser.role !== 'Senior'
            ? currentUser.id
            : matchedUser.id,

        meeting_date: meetingDate,

        meeting_time: meetingTime,

        meeting_location: meetingLocation,

        notes: notes,

        created_by: currentUser.id
      }
    )

    // IF SUCCESS
    .then(res => {

      console.log(res.data);

      Alert.alert(
        'Success',
        'Schedule created successfully!'
      );

      navigation.goBack();
    })

    // IF ERROR
    .catch(err => {

      console.log(err);

      Alert.alert(
        'Error',
        'Failed to create schedule'
      );
    });
  };

  return (

    <ScrollView contentContainerStyle={styles.container}>

      {/* SCREEN TITLE */}
      <Text style={styles.title}>
        Create Schedule
      </Text>

      {/* MATCHED USER NAME */}
      <Text style={styles.subtitle}>
        Meeting with {matchedUser.name}
      </Text>

      {/* DATE INPUT */}
      <TextInput
        placeholder="Meeting Date (YYYY-MM-DD)"
        placeholderTextColor="#666"
        style={styles.input}
        value={meetingDate}
        onChangeText={setMeetingDate}
      />

      {/* TIME INPUT */}
      <TextInput
        placeholder="Meeting Time (HH:MM:SS)"
        placeholderTextColor="#666"
        style={styles.input}
        value={meetingTime}
        onChangeText={setMeetingTime}
      />

      {/* LOCATION INPUT */}
      <TextInput
        placeholder="Meeting Location"
        placeholderTextColor="#666"
        style={styles.input}
        value={meetingLocation}
        onChangeText={setMeetingLocation}
      />

      {/* NOTES INPUT */}
      <TextInput
        placeholder="Notes"
        placeholderTextColor="#666"
        multiline
        style={styles.notesInput}
        value={notes}
        onChangeText={setNotes}
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleCreateSchedule}
      >

        <Text style={styles.buttonText}>
          Save Schedule
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
    backgroundColor: '#F5F7FA',
    justifyContent: 'center'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1E3A5F'
  },

  subtitle: {
    textAlign: 'center',
    marginBottom: 25,
    color: '#555',
    fontSize: 16
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    color: '#222',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D6E4F0'
  },

  notesInput: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    height: 120,
    textAlignVertical: 'top',
    color: '#222',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D6E4F0'
  },

  button: {
    backgroundColor: '#4A90E2',
    padding: 16,
    borderRadius: 12
  },

  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});
