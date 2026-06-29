// IMPORT REACT + STATE HOOK
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import FormData from 'form-data';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
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
  Image,
  KeyboardAvoidingView,
  Platform
} from 'react-native';

// IMPORT AXIOS FOR API REQUESTS
import axios from 'axios';

// IMPORT DROPDOWN PICKER
import { Picker } from '@react-native-picker/picker';

// REGISTER SCREEN COMPONENT
export default function RegisterScreen({ navigation }) {

  // STORE USER NAME
  const [name, setName] = useState('');

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

  // SENIOR
  const [seniorCondition, setSeniorCondition] =
    useState('');

  const [emergencyContact, setEmergencyContact] =
    useState('');

  const [medication, setMedication] =
    useState('');

  // CAREGIVER
  const [caregiverExperience, setCaregiverExperience] =
    useState('');
  

  const [caregiverSpecialization, setCaregiverSpecialization] =
    useState('');

  const [caregiverCertificate, setCaregiverCertificate] =
    useState('');
  
  const [caregiverCertificateImage, setCaregiverCertificateImage] =
  useState('');

  // VOLUNTEER
  const [volunteerHeight, setVolunteerHeight] =
    useState('');

  const [volunteerWeight, setVolunteerWeight] =
    useState('');

  const [volunteerSkills, setVolunteerSkills] =
    useState('');

  const [volunteerAvailability, setVolunteerAvailability] =
    useState('');

  // TERMS & CONDITIONS
  const [agreeTerms, setAgreeTerms] =
    useState(false);

  const [agreeWaiver, setAgreeWaiver] =
    useState(false);

  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // PHILIPPINE ADDRESSES
const philippinesAddresses = [
    'Manila',
    'Quezon City',
    'Caloocan',
    'Makati',
    'Taguig',
    'Pasig',
    'Pasay',
    'Muntinlupa',
    'Cebu City',
    'Davao City',
    'Angeles City',
    'San Fernando, Pampanga',
    'Mexico, Pampanga',
    'Apalit, Pampanga',
    'Lubao, Pampanga',
    'Guagua, Pampanga',
    'Floridablanca, Pampanga',
    'Others'
  ];

  // SENIOR CONDITIONS
  const medicalConditions = [
    'None',
    'Hypertension',
    'Diabetes',
    'Arthritis',
    'Asthma',
    'Heart Disease',
    'Stroke',
    'Dementia',
    'Alzheimers',
    'Kidney Disease',
    'Others'
  ];

  // MEDICATION OPTIONS
  const medicationOptions = [
    'None',
    'Paracetamol',
    'Losartan',
    'Amlodipine',
    'Metformin',
    'Insulin',
    'Atorvastatin',
    'Omeprazole',
    'Salbutamol',
    'Aspirin',
    'Clopidogrel',
    'Calcium + Vitamin D',
    'Others'
  ];

  // CAREGIVER EXPERIENCE
  const caregiverExperienceOptions = [
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5 Years',
    '6 Years',
    '7 Years',
    '8 Years',
    '9 Years',
    '10 Years',
    '11 Years',
    '12 Years',
    '13 Years',
    '14 Years',
    '15 Years',
    '16 Years',
    '17 Years',
    '18 Years',
    '19 Years',
    '20 Years',
    'Others'
  ];

  // CAREGIVER SPECIALIZATION
  const caregiverSpecializations = [
    'Elderly Care',
    'Dementia Care',
    'Alzheimers Care',
    'Bedridden Care',
    'Post-Stroke Care',
    'Palliative Care',
    'Companion Care',
    'Mobility Assistance',
    'Medication Assistance',
    'Wound Care',
    'Diabetes Care',
    'Home Care',
    'Live-in Care',
    'Special Needs Care',
    'Others'
  ];

  // VOLUNTEER HEIGHT
  const volunteerHeights = [
    '140',
    '141',
    '142',
    '143',
    '144',
    '145',
    '146',
    '147',
    '148',
    '149',
    '150',
    '151',
    '152',
    '153',
    '154',
    '155',
    '156',
    '157',
    '158',
    '159',
    '160',
    '161',
    '162',
    '163',
    '164',
    '165',
    '166',
    '167',
    '168',
    '169',
    '170',
    '171',
    '172',
    '173',
    '174',
    '175',
    '176',
    '177',
    '178',
    '179',
    '180',
    '181',
    '182',
    '183',
    '184',
    '185',
    '186',
    '187',
    '188',
    '189',
    '190',
    '191',
    '192',
    '193',
    '194',
    '195',
    '196',
    '197',
    '198',
    '199',
    '200',
    'Others'
  ];

  // VOLUNTEER WEIGHT
  const volunteerWeights = [
    '40kg',
    '45kg',
    '50kg',
    '55kg',
    '60kg',
    '65kg',
    '70kg',
    '75kg',
    '80kg',
    '85kg',
    '90kg',
    '95kg',
    '100kg',
    'Others'
  ];

  // VOLUNTEER SKILLS
  const volunteerSkillsOptions = [
    'Communication',
    'Cooking',
    'Cleaning',
    'First Aid',
    'Driving',
    'Companionship',
    'Mobility Assistance',
    'Technology Assistance',
    'Exercise Assistance',
    'Medication Reminder',
    'Others'
  ];

  // VOLUNTEER AVAILABILITY
  const volunteerAvailabilityOptions = [
    'Weekdays',
    'Weekends',
    'Morning',
    'Afternoon',
    'Evening',
    'Full Time',
    'Part Time',
    'Anytime'
  ];

  // OTHER INPUT STATES
  const [otherLocation, setOtherLocation] = useState('');
  const [otherSeniorCondition, setOtherSeniorCondition] = useState('');
  const [otherCaregiverExperience, setOtherCaregiverExperience] = useState('');
  const [otherCaregiverSpecialization, setOtherCaregiverSpecialization] = useState('');
  const [otherVolunteerHeight, setOtherVolunteerHeight] = useState('');
  const [otherVolunteerWeight, setOtherVolunteerWeight] = useState('');
  const [otherVolunteerSkills, setOtherVolunteerSkills] = useState('');
  const [otherMedication, setOtherMedication] = useState('');
  
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

  // PICK CAREGIVER CERTIFICATE IMAGE
  const pickCaregiverCertificate = async () => {

    let result =
      await ImagePicker.launchImageLibraryAsync({

        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,

        allowsEditing: true,

        quality: 1
      });

    // IF USER SELECTED IMAGE
    if (!result.canceled) {

      setCaregiverCertificateImage(
        result.assets[0].uri
      );
    }
  };

  const sendOtp = async () => {

    if (!email) {

      Alert.alert(
        "Error",
        "Please enter email"
      );

      return;
    }

    try {

      const res = await axios.post(

        'http://192.168.0.216/eldercare-api/send_otp.php',

        {
          email: email
        }

      );

      console.log(res.data);

      if (res.data.status === 'exists') {

        Alert.alert(
          "Email Exists",
          "This email is already registered"
        );

        return;
      }

      if (res.data.status === 'success') {

        Alert.alert(
          "OTP Sent",
          "Please check your email"
        );

        setShowOtpInput(true);
      }

    } catch (err) {

      Alert.alert(
        "Error",
        "Failed to send OTP"
      );
    }
  };

  const verifyOtp = async () => {

    try {

      const res = await axios.post(

        'http://192.168.0.216/eldercare-api/verify_otp.php',

        {
          email: email,
          otp: otp
        }

      );

      if (res.data.status === 'success') {

        setOtpVerified(true);

        Alert.alert(
          "Success",
          "OTP verified successfully"
        );

      } else {

        Alert.alert(
          "Invalid OTP",
          "Please try again"
        );
      }

    } catch (err) {

      Alert.alert(
        "Error",
        "OTP verification failed"
      );
    }
  };

  // FUNCTION TO REGISTER USER
  const handleRegister = async () => {

    // CHECK IF THERE ARE EMPTY FIELDS
    if (
      !name ||
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

    // SENIOR AGE VALIDATION (60 YEARS OLD ABOVE)
    if (role === 'Senior') {

      const today = new Date();

      const birth = new Date(birthDate);

      let age =
        today.getFullYear() -
        birth.getFullYear();

      const monthDifference =
        today.getMonth() -
        birth.getMonth();

      // ADJUST AGE IF BIRTHDAY NOT YET REACHED
      if (
        monthDifference < 0 ||
        (
          monthDifference === 0 &&
          today.getDate() < birth.getDate()
        )
      ) {

        age--;
      }

      // CHECK IF BELOW 60
      if (age < 60) {

        Alert.alert(
          "Age Restriction",
          "Senior accounts are only for users 60 years old and above."
        );

        return;
      }
    }

    // SENIOR VALIDATION
    if (
      role === 'Senior' &&
      (
        !seniorCondition ||
        !emergencyContact ||
        !medication
      )
    ) {

      Alert.alert(
        "Error",
        "Please complete senior information"
      );

      return;
    }

    // CAREGIVER VALIDATION
    if (
      role === 'Caregiver' &&
      (
        !caregiverExperience ||
        !caregiverSpecialization ||
        !caregiverCertificateImage
      )
    ) {

      Alert.alert(
        "Error",
        "Please complete caregiver information"
      );

      return;
    }

    // VOLUNTEER VALIDATION
    if (
      role === 'Volunteer' &&
      (
        !volunteerHeight ||
        !volunteerWeight ||
        !volunteerSkills ||
        !volunteerAvailability
      )
    ) {

      Alert.alert(
        "Error",
        "Please complete volunteer information"
      );

      return;
    }

    // TERMS VALIDATION
    if (!agreeTerms || !agreeWaiver) {

      Alert.alert(
        "Agreement Required",
        "Please accept the Terms, Conditions, and Waiver."
      );

      return;
    }

    // FINAL VALUES
    const finalLocation =
      location === 'Others'
        ? otherLocation
        : location;

    const finalSeniorCondition =
      seniorCondition === 'Others'
        ? otherSeniorCondition
        : seniorCondition;

    const finalMedication =
      medication === 'Others'
        ? otherMedication
        : medication;

    const finalCaregiverExperience =
      caregiverExperience === 'Others'
        ? otherCaregiverExperience
        : caregiverExperience;

    const finalCaregiverSpecialization =
      caregiverSpecialization === 'Others'
        ? otherCaregiverSpecialization
        : caregiverSpecialization;

    const finalVolunteerHeight =
      volunteerHeight === 'Others'
        ? otherVolunteerHeight
        : volunteerHeight;

    const finalVolunteerWeight =
      volunteerWeight === 'Others'
        ? otherVolunteerWeight
        : volunteerWeight;

    const finalVolunteerSkills =
      volunteerSkills === 'Others'
        ? otherVolunteerSkills
        : volunteerSkills;

    // VALIDATE OTHER FIELDS
    if (
      location === 'Others' &&
      !otherLocation
    ) {
      Alert.alert(
        "Error",
        "Please specify your location"
      );
      return;
    }

    if (
      seniorCondition === 'Others' &&
      !otherSeniorCondition
    ) {
      Alert.alert(
        "Error",
        "Please specify medical condition"
      );
      return;
    }

    if (
      medication === 'Others' &&
      !otherMedication
    ) {
      Alert.alert(
        "Error",
        "Please specify medication"
      );
      return;
    }

    if (
      caregiverExperience === 'Others' &&
      !otherCaregiverExperience
    ) {
      Alert.alert(
        "Error",
        "Please specify experience"
      );
      return;
    }

    if (
      caregiverSpecialization === 'Others' &&
      !otherCaregiverSpecialization
    ) {
      Alert.alert(
        "Error",
        "Please specify specialization"
      );
      return;
    }

    if (
      volunteerHeight === 'Others' &&
      !otherVolunteerHeight
    ) {
      Alert.alert(
        "Error",
        "Please specify height"
      );
      return;
    }

    if (
      volunteerWeight === 'Others' &&
      !otherVolunteerWeight
    ) {
      Alert.alert(
        "Error",
        "Please specify weight"
      );
      return;
    }

    if (
      volunteerSkills === 'Others' &&
      !otherVolunteerSkills
    ) {
      Alert.alert(
        "Error",
        "Please specify skill"
      );
      return;
    }

    if (!otpVerified) {

      Alert.alert(
        "OTP Required",
        "Please verify your email first"
      );

      return;
    }

    try {

      // CREATE FORM DATA
      const formData = new FormData();



      // APPEND TEXT DATA
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('location', finalLocation);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      formData.append('gender', gender);
      formData.append('birth_date', birthDate);
      // SENIOR
      formData.append(
        'senior_condition',
        finalSeniorCondition
      );

      formData.append(
        'emergency_contact',
        emergencyContact
      );

      formData.append(
        'medication',
        finalMedication
      );

      // CAREGIVER
      formData.append(
        'caregiver_experience',
        finalCaregiverExperience
      );

      formData.append(
        'caregiver_specialization',
        finalCaregiverSpecialization
      );

      // CAREGIVER CERTIFICATE IMAGE
      if (
        role === 'Caregiver' &&
        caregiverCertificateImage
      ) {

        formData.append('caregiver_certificate', {

          uri: caregiverCertificateImage,
          name: 'caregiver_certificate.jpg',
          type: 'image/jpeg'

        });
      }

      // VOLUNTEER
      formData.append(
        'volunteer_height',
        finalVolunteerHeight
      );

      formData.append(
        'volunteer_weight',
        finalVolunteerWeight
      );

      formData.append(
        'volunteer_skills',
        finalVolunteerSkills
      );

      formData.append(
        'volunteer_availability',
        volunteerAvailability
      );

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
          "Account created successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('Login')
            }
          ]
        );
      }

    } catch (err) {

      console.log("REGISTER ERROR:", err.response?.data || err);

      Alert.alert(
        "Error",
        "Registration failed"
      );
    }

  };

  return (

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
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
        keyboardShouldPersistTaps="handled"
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

          {/* LOCATION PICKER */}
          <View style={styles.pickerContainer}>

            <Picker
              selectedValue={location}
              style={styles.picker}
              onValueChange={(itemValue) =>
                setLocation(itemValue)
              }
            >

              <Picker.Item
                label="Select Philippine Address"
                value=""
              />

              {
                philippinesAddresses.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item}
                    value={item}
                  />
                ))
              }

            </Picker>

          </View>

          {
            location === 'Others' && (
              <TextInput
                placeholder="Enter Address"
                placeholderTextColor="#666"
                style={styles.input}
                value={otherLocation}
                onChangeText={setOtherLocation}
              />
            )
          }

          {/* EMAIL INPUT */}
          <TextInput
            placeholder="Email"
            placeholderTextColor="#666"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
          />

          {/* SEND OTP BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={sendOtp}
          >

            <Text style={styles.buttonText}>
              Send OTP
            </Text>

          </TouchableOpacity>

          {
            showOtpInput && (

              <>
              
                <TextInput
                  placeholder="Enter OTP"
                  placeholderTextColor="#666"
                  style={styles.input}
                  keyboardType="number-pad"
                  value={otp}
                  onChangeText={setOtp}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={verifyOtp}
                >

                  <Text style={styles.buttonText}>
                    Verify OTP
                  </Text>

                </TouchableOpacity>

              </>
            )
          }

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

          {/* SENIOR FIELDS */}
          {
            role === 'Senior' && (
              <>

                <TextInput
                  placeholder="Emergency Contact"
                  placeholderTextColor="#666"
                  keyboardType="phone-pad"
                  style={styles.input}
                  onChangeText={setEmergencyContact}
                />

                {/* MEDICATION PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={medication}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setMedication(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Select Medication"
                      value=""
                    />

                    {
                      medicationOptions.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

                {
                  medication === 'Others' && (
                    <TextInput
                      placeholder="Specify Medication"
                      placeholderTextColor="#666"
                      style={styles.input}
                      value={otherMedication}
                      onChangeText={setOtherMedication}
                    />
                  )
                }

                {/* MEDICAL CONDITION PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={seniorCondition}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setSeniorCondition(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Select Medical Condition"
                      value=""
                    />

                    {
                      medicalConditions.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

                {
                  seniorCondition === 'Others' && (
                    <TextInput
                      placeholder="Specify Medical Condition"
                      placeholderTextColor="#666"
                      style={styles.input}
                      value={otherSeniorCondition}
                      onChangeText={setOtherSeniorCondition}
                    />
                  )
                }

              </>
            )
          }

          {/* CAREGIVER FIELDS */}
          {
            role === 'Caregiver' && (
              <>

                {/* EXPERIENCE PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={caregiverExperience}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setCaregiverExperience(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Years of Experience"
                      value=""
                    />

                    {
                      caregiverExperienceOptions.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

                {
                  caregiverExperience === 'Others' && (
                    <TextInput
                      placeholder="Specify Experience"
                      placeholderTextColor="#666"
                      style={styles.input}
                      value={otherCaregiverExperience}
                      onChangeText={setOtherCaregiverExperience}
                    />
                  )
                }

                {/* SPECIALIZATION PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={caregiverSpecialization}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setCaregiverSpecialization(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Select Specialization"
                      value=""
                    />

                    {
                      caregiverSpecializations.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

                {
                  caregiverSpecialization === 'Others' && (
                    <TextInput
                      placeholder="Specify Specialization"
                      placeholderTextColor="#666"
                      style={styles.input}
                      value={otherCaregiverSpecialization}
                      onChangeText={setOtherCaregiverSpecialization}
                    />
                  )
                }

                {/* CAREGIVER CERTIFICATE UPLOAD */}
                <TouchableOpacity
                  style={styles.validIdContainer}
                  onPress={pickCaregiverCertificate}
                >

                  {
                    caregiverCertificateImage ? (

                      <Image
                        source={{
                          uri: caregiverCertificateImage
                        }}
                        style={styles.validIdImage}
                      />

                    ) : (

                      <View style={styles.validIdPlaceholder}>

                        <Text style={styles.validIdText}>
                          Upload Certificate / License
                        </Text>

                      </View>
                    )
                  }

                </TouchableOpacity>

              </>
            )
          }

          {/* VOLUNTEER FIELDS */}
          {
            role === 'Volunteer' && (
              <>

                {/* HEIGHT PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={volunteerHeight}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setVolunteerHeight(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Select Height (cm)"
                      value=""
                    />

                    {
                      volunteerHeights.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

                {
                  volunteerHeight === 'Others' && (
                    <TextInput
                      placeholder="Enter Height in cm"
                      placeholderTextColor="#666"
                      style={styles.input}
                      value={otherVolunteerHeight}
                      onChangeText={setOtherVolunteerHeight}
                    />
                  )
                }

                {/* WEIGHT PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={volunteerWeight}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setVolunteerWeight(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Select Weight"
                      value=""
                    />

                    {
                      volunteerWeights.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

                {
                  volunteerWeight === 'Others' && (
                    <TextInput
                      placeholder="Enter Weight"
                      placeholderTextColor="#666"
                      style={styles.input}
                      value={otherVolunteerWeight}
                      onChangeText={setOtherVolunteerWeight}
                    />
                  )
                }

                {/* SKILLS PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={volunteerSkills}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setVolunteerSkills(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Select Skill"
                      value=""
                    />

                    {
                      volunteerSkillsOptions.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

                {
                  volunteerSkills === 'Others' && (
                    <TextInput
                      placeholder="Specify Skill"
                      placeholderTextColor="#666"
                      style={styles.input}
                      value={otherVolunteerSkills}
                      onChangeText={setOtherVolunteerSkills}
                    />
                  )
                }

                {/* AVAILABILITY PICKER */}
                <View style={styles.pickerContainer}>

                  <Picker
                    selectedValue={volunteerAvailability}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setVolunteerAvailability(itemValue)
                    }
                  >

                    <Picker.Item
                      label="Select Availability"
                      value=""
                    />

                    {
                      volunteerAvailabilityOptions.map((item, index) => (
                        <Picker.Item
                          key={index}
                          label={item}
                          value={item}
                        />
                      ))
                    }

                  </Picker>

                </View>

              </>
            )
          }

          {/* APPROVAL NOTICE */}
          <View style={styles.noticeBox}>

            <Text style={styles.noticeTitle}>
              Registration Approval
            </Text>

            <Text style={styles.noticeText}>
              Your account will be reviewed by the admin.
              Approval usually takes 1 to 2 days depending
              on verification of your information and documents.
            </Text>

          </View>

          {/* TERMS & CONDITIONS */}
          <View style={styles.checkboxContainer}>

            <Checkbox
              value={agreeTerms}
              onValueChange={setAgreeTerms}
              color={agreeTerms ? '#2196F3' : undefined}
            />

            <Text style={styles.checkboxText}>
              I agree to the Terms and Conditions of ElderCare Matter.
            </Text>

          </View>

          {/* WAIVER */}
          <View style={styles.checkboxContainer}>

            <Checkbox
              value={agreeWaiver}
              onValueChange={setAgreeWaiver}
              color={agreeWaiver ? '#2196F3' : undefined}
            />

            <Text style={styles.checkboxText}>
              I confirm that all information and uploaded
              documents are true and valid.
            </Text>

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

  </KeyboardAvoidingView>
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

  noticeBox: {
    backgroundColor: '#EAF4FF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  noticeTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#1E3A5F',
    marginBottom: 5
  },

  noticeText: {
    color: '#444',
    lineHeight: 20
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15
  },

  checkboxText: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
    lineHeight: 20
  },

});