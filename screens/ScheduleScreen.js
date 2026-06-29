// IMPORT REACT
import React, { useState } from 'react';

// IMPORT DATE TIME PICKER
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
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// IMPORT AXIOS
import axios from 'axios';

// EXPORT SCREEN
export default function ScheduleScreen({
  route,
  navigation
}) {

  // GET USERS
  const {
    currentUser,
    matchedUser
  } = route.params;

  // DATE STATE
  const [meetingDate, setMeetingDate] = useState('');

  // TIME STATE
  const [meetingTime, setMeetingTime] = useState('');

  // LOCATION STATE
  const [meetingLocation, setMeetingLocation] = useState('');

  // EMERGENCY CONTACT STATE
  const [emergencyContact, setEmergencyContact] =
    useState('');

  // NOTES STATE
  const [notes, setNotes] = useState('');

  // SHOW DATE PICKER
  const [showDatePicker, setShowDatePicker] =
    useState(false);

  // SHOW TIME PICKER
  const [showTimePicker, setShowTimePicker] =
    useState(false);

  // DATE OBJECT
  const [date, setDate] = useState(new Date());

  // TIME OBJECT
  const [time, setTime] = useState(new Date());

  // CREATE SCHEDULE
  const handleCreateSchedule = () => {

    // VALIDATION
    if (
      !meetingDate ||
      !meetingTime ||
      !meetingLocation ||
      !emergencyContact
    ) {

      Alert.alert(
        'Error',
        'Please fill all schedule fields'
      );

      return;
    }

    // SEND TO API
    axios.post(
      'http://192.168.0.216/eldercare-api/create_schedule.php',

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

        emergency_contact: emergencyContact,

        notes: notes,

        created_by: currentUser.id
      }
    )

    .then(res => {

      console.log(res.data);

      Alert.alert(
        'Success',
        'Schedule created successfully!'
      );

      navigation.goBack();
    })

    .catch(err => {

      console.log(err);

      Alert.alert(
        'Error',
        'Failed to create schedule'
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
          Create Schedule
        </Text>

        {/* SUBTITLE */}
        <Text style={styles.subtitle}>
          Meeting with {matchedUser.name}
        </Text>

        {/* DATE PICKER */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text
            style={{
              color: meetingDate ? '#000' : '#666',
              fontSize: 16
            }}
          >
            {meetingDate ? meetingDate : 'Select Meeting Date'}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDate(selectedDate);

                const formattedDate =
                  selectedDate.toISOString().split('T')[0];

                setMeetingDate(formattedDate);
              }
            }}
          />
        )}

        {/* TIME PICKER */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowTimePicker(true)}
        >
          <Text
            style={{
              color: meetingTime ? '#000' : '#666',
              fontSize: 16
            }}
          >
            {meetingTime ? meetingTime : 'Select Meeting Time'}
          </Text>
        </TouchableOpacity>

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);

              if (selectedTime) {
                setTime(selectedTime);

                let hours = selectedTime.getHours();
                let minutes = selectedTime.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';

                hours = hours % 12;
                hours = hours ? hours : 12;
                minutes = minutes < 10 ? '0' + minutes : minutes;

                const formattedTime = `${hours}:${minutes} ${ampm}`;

                setMeetingTime(formattedTime);
              }
            }}
          />
        )}

        {/* LOCATION */}
        <TextInput
          placeholder="Meeting Location"
          placeholderTextColor="#666"
          style={styles.input}
          value={meetingLocation}
          onChangeText={setMeetingLocation}
        />

        {/* EMERGENCY CONTACT */}
        <TextInput
          placeholder="Emergency Contact Number"
          placeholderTextColor="#666"
          style={styles.input}
          value={emergencyContact}
          onChangeText={setEmergencyContact}
          keyboardType="phone-pad"
        />

        {/* NOTES */}
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
    </KeyboardAvoidingView>
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
    borderWidth: 1,
    borderColor: '#D6E4F0',
    justifyContent: 'center'
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