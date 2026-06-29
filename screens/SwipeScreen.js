// IMPORT REACT
import React, {
  useState,
  useEffect,
  useRef
} from 'react';

// IMPORT COMPONENTS
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  StatusBar,
  Modal,
  TextInput
} from 'react-native';

import { Picker } from '@react-native-picker/picker';

// IMPORT SWIPER
import Swiper from 'react-native-deck-swiper';

// IMPORT AXIOS
import axios from 'axios';

// SCREEN
export default function SwipeScreen({
  route,
  navigation
}) {

  const { user } = route.params;

  const currentUser = user;

  const [users, setUsers] = useState([]);

  const [matches, setMatches] = useState([]);

  // GENDER FILTER
  const [genderFilter, setGenderFilter] =
    useState('All');

  // ALL USERS STORAGE
  const [allUsers, setAllUsers] =
    useState([]);

  // SHOW GENDER PREFERENCE ONLY ONCE
  const [preferenceAsked, setPreferenceAsked] =
    useState(false);

  // SHOW PREFERENCE MODAL
  const [showPreferenceModal, setShowPreferenceModal] =
    useState(true);

  const [showFilterModal, setShowFilterModal] =
    useState(false);

  // COMMON
  const [locationFilter, setLocationFilter] =
    useState('');

  // SENIOR
  const [conditionFilter, setConditionFilter] =
    useState('');

  const [medicationFilter, setMedicationFilter] =
    useState('');

  // CAREGIVER
  const [experienceFilter, setExperienceFilter] =
    useState('');

  const [specializationFilter, setSpecializationFilter] =
    useState('');

  // VOLUNTEER
  const [heightFilter, setHeightFilter] =
    useState('');

  const [weightFilter, setWeightFilter] =
    useState('');

  const [skillsFilter, setSkillsFilter] =
    useState('');

  const [availabilityFilter, setAvailabilityFilter] =
    useState('');

  const swiperRef = useRef(null);

  // LOAD USERS
  useEffect(() => {

    axios.get(
      'http://192.168.0.216/eldercare-api/get_users.php'
    )

    .then(res => {

      if (!res.data) return;

      const filtered = res.data

        .filter(u => {

          // REMOVE CURRENT USER
          if (u.id == currentUser.id) {
            return false;
          }

          // SENIOR CAN SEE:
          // CAREGIVER + VOLUNTEER
          if (currentUser.role === 'Senior') {

            if (
              u.role !== 'Caregiver' &&
              u.role !== 'Volunteer'
            ) {
              return false;
            }
          }

          // CAREGIVER/VOLUNTEER
          // CAN SEE SENIORS
          else {

            if (u.role !== 'Senior') {
              return false;
            }
          }

          // GENDER FILTER
          if (
            genderFilter !== 'All' &&
            u.gender !== genderFilter
          ) {
            return false;
          }

          // LOCATION
          if (
            locationFilter &&
            !String(u.location || '')
              .toLowerCase()
              .includes(
                locationFilter.toLowerCase()
              )
          ) {
            return false;
          }

          if (
            conditionFilter &&
            !String(u.senior_condition || '')
              .toLowerCase()
              .includes(
                conditionFilter.toLowerCase()
              )
          ) {
            return false;
          }

          if (
            medicationFilter &&
            !String(u.medication || '')
              .toLowerCase()
              .includes(
                medicationFilter.toLowerCase()
              )
          ) {
            return false;
          }

          if (experienceFilter) {

            const experience =
              parseInt(u.caregiver_experience) || 0;

            if (
              experience <
              Number(experienceFilter)
            ) {
              return false;
            }

          }

          if (
            specializationFilter &&
            !String(
              u.caregiver_specialization || ''
            )
              .toLowerCase()
              .includes(
                specializationFilter.toLowerCase()
              )
          ) {
            return false;
          }

          if (heightFilter) {

            const volunteerHeight =
              parseInt(u.volunteer_height) || 0;

            if (
              volunteerHeight <
              Number(heightFilter)
            ) {
              return false;
            }

          }

          if (weightFilter) {

            const volunteerWeight =
              parseInt(
                String(u.volunteer_weight)
                  .replace(/[^\d]/g, '')
              ) || 0;

            if (
              volunteerWeight <
              Number(weightFilter)
            ) {
              return false;
            }

          }

          if (
            skillsFilter &&
            !String(u.volunteer_skills || '')
              .toLowerCase()
              .includes(
                skillsFilter.toLowerCase()
              )
          ) {
            return false;
          }

          if (
            availabilityFilter &&
            !String(u.volunteer_availability || '')
              .toLowerCase()
              .includes(
                availabilityFilter.toLowerCase()
              )
          ) {
            return false;
          }
          
          return true;
        })

        // SMART MATCHING SORT
        .sort((a, b) => {

          let scoreA = 0;
          let scoreB = 0;

          // LOCATION MATCH
          if (
            a.location === currentUser.location
          ) {
            scoreA += 3;
          }

          if (
            b.location === currentUser.location
          ) {
            scoreB += 3;
          }

          // SENIOR LOOKING FOR CAREGIVER
          if (currentUser.role === 'Senior') {

            // SPECIALIZATION MATCH
            if (
              a.role === 'Caregiver' &&
              a.caregiver_specialization &&
              currentUser.senior_condition
            ) {

              if (
                a.caregiver_specialization
                  .toLowerCase()
                  .includes(
                    currentUser.senior_condition
                      .toLowerCase()
                  )
              ) {

                scoreA += 5;
              }
            }

            if (
              b.role === 'Caregiver' &&
              b.caregiver_specialization &&
              currentUser.senior_condition
            ) {

              if (
                b.caregiver_specialization
                  .toLowerCase()
                  .includes(
                    currentUser.senior_condition
                      .toLowerCase()
                  )
              ) {

                scoreB += 5;
              }
            }

            // EXPERIENCE BONUS
            if (a.caregiver_experience) {

              scoreA += parseInt(
                a.caregiver_experience
              ) || 0;
            }

            if (b.caregiver_experience) {

              scoreB += parseInt(
                b.caregiver_experience
              ) || 0;
            }
          }

          return scoreB - scoreA;
        });

      Promise.all(

        filtered.map(async user => {

          try {

            const ratingRes = await axios.get(

              `http://192.168.0.216/eldercare-api/get_user_ratings.php?user_id=${user.id}`

            );

            return {

              ...user,

              average_rating:
                ratingRes.data.average_rating,

              total_ratings:
                ratingRes.data.total_ratings,

              total_likes:
                ratingRes.data.total_likes
            };

          } catch {

            return {

              ...user,

              average_rating: 0,
              total_ratings: 0,
              total_likes: 0
            };
          }
        })

      ).then(updatedUsers => {

        setUsers(updatedUsers);

      });

      setAllUsers(res.data);

    })

    .catch(err => console.log(err));

  }, [
    genderFilter,
    locationFilter,
    conditionFilter,
    medicationFilter,
    experienceFilter,
    specializationFilter,
    heightFilter,
    weightFilter,
    skillsFilter,
    availabilityFilter
  ]);

  // LIKE
  const handleSwipeRight = (index) => {

    const selectedUser = users[index];

    if (!selectedUser) return;

    axios.post(
      'http://192.168.0.216/eldercare-api/swipe.php',

      {
        swiper_id: currentUser.id,
        swiped_id: selectedUser.id,
        action: 'like'
      }
    )

    .then(res => {

      if (res.data.match) {

        setMatches(prev => [
          ...prev,
          selectedUser
        ]);

        Alert.alert(
          '🎉 Match!',
          `You matched with ${selectedUser.name}`,

          [
            {
              text: 'Later',
              style: 'cancel'
            },

            {
              text: 'Schedule Meet',

              onPress: () => {

                navigation.navigate(
                  'Schedule',

                  {
                    currentUser,
                    matchedUser: selectedUser
                  }
                );
              }
            }
          ]
        );
      }
    });
  };

  // PASS
  const handleSwipeLeft = (index) => {};

  // SELECT GENDER PREFERENCE
  const selectGenderPreference = (gender) => {

    setGenderFilter(gender);

    setShowPreferenceModal(false);
  };

  return (

    <View style={styles.container}>

      <StatusBar
        backgroundColor="#EAF4FF"
        barStyle="dark-content"
      />

      {/* GENDER PREFERENCE MODAL */}
      <Modal
        visible={showPreferenceModal}
        transparent
        animationType="fade"
      >

        <View style={styles.modalOverlay}>

          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>
              Gender Preference
            </Text>

            <Text style={styles.modalSubtitle}>
              Choose your preferred gender
              to find better matches.
            </Text>

            {/* ALL */}
            <TouchableOpacity
              style={styles.preferenceButton}
              onPress={() =>
                selectGenderPreference('All')
              }
            >

              <Text style={styles.preferenceText}>
                All
              </Text>

            </TouchableOpacity>

            {/* MALE */}
            <TouchableOpacity
              style={styles.preferenceButton}
              onPress={() =>
                selectGenderPreference('Male')
              }
            >

              <Text style={styles.preferenceText}>
                👨 Male
              </Text>

            </TouchableOpacity>

            {/* FEMALE */}
            <TouchableOpacity
              style={styles.preferenceButton}
              onPress={() =>
                selectGenderPreference('Female')
              }
            >

              <Text style={styles.preferenceText}>
                👩 Female
              </Text>

            </TouchableOpacity>

          </View>

        </View>

      </Modal>

      <Modal
        visible={showFilterModal}
        animationType="slide"
      >
        <View style={styles.modalContainer}>

          <Text style={styles.modalTitle}>
            Filters
          </Text>

          {/* LOCATION */}
          <Text>Location</Text>

          <TextInput
            style={styles.input}
            placeholder="San Fernando"
            value={locationFilter}
            onChangeText={setLocationFilter}
          />

          {/* SENIOR */}
          {currentUser.role !== 'Senior' && (
            <>
              <Text>Condition</Text>

              <TextInput
                style={styles.input}
                value={conditionFilter}
                onChangeText={setConditionFilter}
                placeholder="Diabetes"
              />

              <Text>Medication</Text>

              <TextInput
                style={styles.input}
                value={medicationFilter}
                onChangeText={setMedicationFilter}
                placeholder="Metformin"
              />
            </>
          )}

          {/* CAREGIVER */}
          {currentUser.role === 'Senior' && (
            <>
              <Text>Experience</Text>

              <TextInput
                style={styles.input}
                value={experienceFilter}
                onChangeText={setExperienceFilter}
                placeholder="5"
                keyboardType="numeric"
              />

              <Text>Specialization</Text>

              <TextInput
                style={styles.input}
                value={specializationFilter}
                onChangeText={setSpecializationFilter}
                placeholder="Dementia"
              />
            </>
          )}

          {/* VOLUNTEER */}
          {currentUser.role === 'Senior' && (
            <>
              <Text>Height</Text>

              <TextInput
                style={styles.input}
                value={heightFilter}
                onChangeText={setHeightFilter}
                placeholder="170"
              />

              <Text>Weight</Text>

              <TextInput
                style={styles.input}
                value={weightFilter}
                onChangeText={setWeightFilter}
                placeholder="70"
              />

              <Text>Skills</Text>

              <TextInput
                style={styles.input}
                value={skillsFilter}
                onChangeText={setSkillsFilter}
                placeholder="Lifting"
              />

              <Text>Availability</Text>

              <TextInput
                style={styles.input}
                value={availabilityFilter}
                onChangeText={setAvailabilityFilter}
                placeholder="Weekends"
              />
            </>
          )}

          <TouchableOpacity
            style={styles.applyButton}
            onPress={() =>
              setShowFilterModal(false)
            }
          >
            <Text style={styles.buttonText}>
              Apply
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {

              setLocationFilter('');

              setConditionFilter('');

              setMedicationFilter('');

              setExperienceFilter('');

              setSpecializationFilter('');

              setHeightFilter('');

              setWeightFilter('');

              setSkillsFilter('');

              setAvailabilityFilter('');
            }}
          >
            <Text style={styles.buttonText}>
              Reset
            </Text>
          </TouchableOpacity>

        </View>
      </Modal>

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Find Companions
        </Text>

        <Text style={styles.matchText}>
          ❤️ Matches: {matches.length}
        </Text>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={styles.filterButtonText}>
            Filter
          </Text>
        </TouchableOpacity>

      </View>

      {/* SWIPER */}
      <Swiper

        ref={swiperRef}

        cards={users}

        key={users.length}

        backgroundColor="transparent"

        stackSize={3}

        animateCardOpacity

        animateOverlayLabelsOpacity

        containerStyle={styles.swiperContainer}

        onSwipedRight={handleSwipeRight}

        onSwipedLeft={handleSwipeLeft}

        renderCard={(card) => {

          if (!card) {

            return (

              <View style={styles.emptyCard}>

                <Text style={styles.emptyText}>
                  No more users
                </Text>

              </View>
            );
          }

          return (

            <View style={styles.card}>

              {/* IMAGE */}
              <Image
                source={{ uri: card.image }}
                style={styles.image}
              />

              {/* INFO */}
              <View style={styles.infoContainer}>

                <Text style={styles.name}>
                  {card.name}
                </Text>

                <Text style={styles.role}>
                  {card.role}
                </Text>

                <Text style={styles.bio}>
                  {card.bio}
                </Text>

                <Text style={styles.location}>
                  📍 {card.location}
                </Text>

                {/* RATINGS */}
                <Text style={styles.rating}>
                  ⭐ {card.average_rating || '0.0'}
                  {' '}({card.total_ratings || 0} reviews)
                </Text>

                {/* LIKES */}
                <Text style={styles.likes}>
                  👍 {card.total_likes || 0} likes
                </Text>

                {/* SENIOR DETAILS */}
                {
                  card.role === 'Senior' && (
                    <>

                      <Text style={styles.detailText}>
                        🩺 Condition:
                        {' '}
                        {card.senior_condition || 'N/A'}
                      </Text>

                      <Text style={styles.detailText}>
                        💊 Medication:
                        {' '}
                        {card.medication || 'N/A'}
                      </Text>

                    </>
                  )
                }

                {/* CAREGIVER DETAILS */}
                {
                  card.role === 'Caregiver' && (
                    <>

                      <Text style={styles.detailText}>
                        👨‍⚕️ Experience:
                        {' '}
                        {card.caregiver_experience || '0'}
                        {' '}
                      </Text>

                      <Text style={styles.detailText}>
                        ⭐ Specialization:
                        {' '}
                        {card.caregiver_specialization || 'N/A'}
                      </Text>

                    </>
                  )
                }

                {/* VOLUNTEER DETAILS */}
                {
                  card.role === 'Volunteer' && (
                    <>

                      <Text style={styles.detailText}>
                        📏 Height:
                        {' '}
                        {card.volunteer_height || 'N/A'}
                      </Text>

                      <Text style={styles.detailText}>
                        ⚖️ Weight:
                        {' '}
                        {card.volunteer_weight || 'N/A'}
                      </Text>

                      <Text style={styles.detailText}>
                        🛠 Skills:
                        {' '}
                        {card.volunteer_skills || 'N/A'}
                      </Text>

                      <Text style={styles.detailText}>
                        📅 Availability:
                        {' '}
                        {card.volunteer_availability || 'N/A'}
                      </Text>

                    </>
                  )
                }

              </View>

            </View>
          );
        }}

        overlayLabels={{

          left: {
            title: 'PASS',
            style: {
              label: styles.nopeLabel
            }
          },

          right: {
            title: 'LIKE',
            style: {
              label: styles.likeLabel
            }
          }
        }}
      />

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#EAF4FF'
  },

  header: {
    marginTop: 10,
    alignItems: 'center'
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1E3A5F'
  },

  matchText: {
    marginTop: 8,
    color: '#FF5A7A',
    fontWeight: 'bold',
    fontSize: 16
  },

  filterContainer: {
    marginTop: -15,
    paddingHorizontal: 20
  },

  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 8
  },

  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 14,
    overflow: 'hidden'
  },

  swiperContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 50
  },

  card: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 6,
    marginTop: 50
  },

  image: {
    width: '100%',
    height: '50%'
  },

  infoContainer: {
    padding: 22
  },

  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F'
  },

  role: {
    marginTop: 5,
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600'
  },

  bio: {
    marginTop: 12,
    color: '#555',
    fontSize: 15
  },

  location: {
    marginTop: 10,
    color: '#666'
  },

  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10
  },

  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },

  passButton: {
    backgroundColor: '#FF6B6B'
  },

  likeButton: {
    backgroundColor: '#4CAF50'
  },

  buttonText: {
    fontSize: 28,
    color: '#fff'
  },

  nopeLabel: {
    backgroundColor: '#FF6B6B',
    color: '#fff',
    fontSize: 24,
    padding: 10,
    borderRadius: 10
  },

  likeLabel: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 24,
    padding: 10,
    borderRadius: 10
  },

  emptyCard: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  emptyText: {
    fontSize: 22,
    color: '#999'
  },

  detailText: {
    marginTop: 6,
    color: '#444',
    fontSize: 14,
    lineHeight: 20
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25
  },

  modalContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 30,
    padding: 28,
    alignItems: 'center',
    elevation: 10
  },

  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E3A5F'
  },

  modalSubtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
    marginBottom: 25,
    lineHeight: 22,
    fontSize: 15
  },

  preferenceButton: {
    width: '100%',
    backgroundColor: '#EAF4FF',
    paddingVertical: 16,
    borderRadius: 18,
    marginBottom: 15,
    alignItems: 'center'
  },

  preferenceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E3A5F'
  },

  filterButton: {
    marginTop: 10,
    backgroundColor: '#4A90E2',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10
  },

  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },

  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10
  },

  applyButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  resetButton: {
    backgroundColor: '#FF6B6B',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  }


});