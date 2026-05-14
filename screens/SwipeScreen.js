// IMPORT REACT + HOOKS
// useState = store data
// useEffect = run code when screen loads
// useRef = control swiper buttons manually
import React, { useState, useEffect, useRef } from 'react';

// IMPORT UI COMPONENTS
// View = container
// Text = display text
// StyleSheet = styles
// Alert = popup alert
// Image = show image
// TouchableOpacity = clickable button
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity
} from 'react-native';

// IMPORT SWIPER LIBRARY
// USED FOR TINDER-LIKE SWIPING
import Swiper from 'react-native-deck-swiper';

// IMPORT AXIOS
// USED FOR API REQUESTS
import axios from 'axios';

// MAIN SCREEN FUNCTION
export default function SwipeScreen({ route, navigation }) {

  // GET USER DATA FROM PREVIOUS SCREEN
  const { user } = route.params;

  // STORE CURRENT LOGGED-IN USER
  const currentUser = user;

  // STORE USERS FROM DATABASE
  const [users, setUsers] = useState([]);

  // STORE MATCHES
  const [matches, setMatches] = useState([]);

  // REFERENCE FOR SWIPER
  // USED FOR BUTTON SWIPE CONTROL
  const swiperRef = useRef(null);

  // RUN WHEN SCREEN LOADS
  useEffect(() => {

    // GET USERS FROM API
    axios.get(
      'http://192.168.0.216/eldercare-api/get_users.php'
    )

    // IF SUCCESS
    .then(res => {

      // IF NO DATA RETURN
      if (!res.data) return;

      // FILTER USERS
      const filtered = res.data.filter(u => {

        // DO NOT SHOW YOURSELF
        if (u.id == currentUser.id) {
          return false;
        }

        // IF CURRENT USER IS SENIOR
        if (currentUser.role === 'Senior') {

          // SHOW CAREGIVERS + VOLUNTEERS
          return (
            u.role === 'Caregiver' ||
            u.role === 'Volunteer'
          );
        }

        // CAREGIVERS/VOLUNTEERS ONLY SEE SENIORS
        return u.role === 'Senior';

      });

      // SAVE FILTERED USERS
      setUsers(filtered);

    })

    // SHOW ERROR IF API FAILS
    .catch(err => console.log(err));

  }, []);

  // FUNCTION FOR RIGHT SWIPE
  // RIGHT SWIPE = LIKE
  const handleSwipeRight = (index) => {

    // GET SELECTED USER
    const selectedUser = users[index];

    // IF NO USER RETURN
    if (!selectedUser) return;

    // SEND LIKE TO DATABASE
    axios.post(

      'http://192.168.0.216/eldercare-api/swipe.php',

      {
        // CURRENT USER ID
        swiper_id: currentUser.id,

        // USER THAT WAS SWIPED
        swiped_id: selectedUser.id,

        // ACTION TYPE
        action: 'like'
      }
    )

    // IF SUCCESS
    .then(res => {

      // IF MATCH EXISTS
      if (res.data.match) {

        // SAVE MATCHED USER
        setMatches(prev => [...prev, selectedUser]);

        // SHOW MATCH ALERT
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

                // OPEN SCHEDULE SCREEN
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

  // FUNCTION FOR LEFT SWIPE
  // LEFT SWIPE = PASS
  const handleSwipeLeft = (index) => {

    // GET SELECTED USER
    const selectedUser = users[index];

    // IF NO USER RETURN
    if (!selectedUser) return;

    // CURRENTLY NO ACTION
  };

  // UI
  return (

    // MAIN CONTAINER
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>

        {/* APP TITLE */}
        <Text style={styles.appTitle}>
          Elder Care Matters
        </Text>

        {/* MATCH COUNT */}
        <Text style={styles.matchText}>
          Matches: {matches.length}
        </Text>

      </View>

      {/* SWIPER SECTION */}
      <View style={styles.swiperWrapper}>

        {/* SWIPER COMPONENT */}
        <Swiper

          // CONNECT REF
          ref={swiperRef}

          // USERS TO DISPLAY
          cards={users}

          // RE-RENDER WHEN USER COUNT CHANGES
          key={users.length}

          // SWIPER STYLE
          containerStyle={styles.swiperContainer}

          // CARD DESIGN
          renderCard={(card) => {

            // IF NO CARD RETURN EMPTY VIEW
            if (!card) return <View />;

            return (

              // CARD CONTAINER
              <View style={styles.card}>

                {/* USER IMAGE */}
                <Image
                  source={{ uri: card.image }}
                  style={styles.image}
                />

                {/* DARK OVERLAY */}
                <View style={styles.gradient} />

                {/* USER INFO */}
                <View style={styles.infoContainer}>

                  {/* NAME + AGE */}
                  <Text style={styles.name}>
                    {card.name}, {card.age || "N/A"}
                  </Text>

                  {/* ROLE */}
                  <Text style={styles.role}>
                    {card.role}
                  </Text>

                  <Text style={styles.bio}>
                     {card.bio}
                  </Text>

                  {/* LOCATION */}
                  <Text style={styles.location}>
                    📍 {card.location}
                  </Text>

                </View>

                {/* BUTTONS */}
                <View style={styles.cardButtons}>

                  {/* PASS BUTTON */}
                  <TouchableOpacity

                    // BUTTON STYLE
                    style={[
                      styles.actionButton,
                      styles.passButton
                    ]}

                    // SWIPE LEFT
                    onPress={() =>
                      swiperRef.current?.swipeLeft()
                    }
                  >

                    {/* BUTTON ICON */}
                    <Text style={styles.buttonIcon}>
                      ❌
                    </Text>

                  </TouchableOpacity>

                  {/* LIKE BUTTON */}
                  <TouchableOpacity

                    // BUTTON STYLE
                    style={[
                      styles.actionButton,
                      styles.likeButton
                    ]}

                    // SWIPE RIGHT
                    onPress={() =>
                      swiperRef.current?.swipeRight()
                    }
                  >

                    {/* BUTTON ICON */}
                    <Text style={styles.buttonIcon}>
                      ❤️
                    </Text>

                  </TouchableOpacity>

                </View>

              </View>
            );
          }}

          // RIGHT SWIPE FUNCTION
          onSwipedRight={handleSwipeRight}

          // LEFT SWIPE FUNCTION
          onSwipedLeft={handleSwipeLeft}

          // NUMBER OF STACKED CARDS
          stackSize={3}

          // SWIPE LABELS
          overlayLabels={{

            // LEFT LABEL
            left: {
              title: 'NOPE',
              style: {
                label: styles.nopeLabel
              }
            },

            // RIGHT LABEL
            right: {
              title: 'LIKE',
              style: {
                label: styles.likeLabel
              }
            }

          }}

          // ANIMATION
          animateOverlayLabelsOpacity

          // CARD ANIMATION
          animateCardOpacity
        />

      </View>

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  // MAIN SCREEN STYLE
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },

  // HEADER STYLE
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // APP TITLE STYLE
  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333'
  },

  // MATCH COUNT STYLE
  matchText: {
    color: '#FF4081',
    fontWeight: 'bold'
  },

  // SWIPER CONTAINER
  swiperWrapper: {
    flex: 1
  },

  // SPACING FOR SWIPER
  swiperContainer: {
    marginTop: 10
  },

  // CARD DESIGN
  card: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 8,
    margin: 10
  },

  // IMAGE STYLE
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },

  // DARK OVERLAY
  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)'
  },

  // USER INFO POSITION
  infoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20
  },

  // NAME STYLE
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold'
  },

  // ROLE STYLE
  role: {
    color: '#FF4081'
  },
  
  // BIO STYLE
  bio: {
    color: '#fff'
  },

  // LOCATION STYLE
  location: {
    color: '#fff'
  },

  // BUTTON CONTAINER
  cardButtons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  // BUTTON STYLE
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // PASS BUTTON COLOR
  passButton: {
    backgroundColor: '#FF5252'
  },

  // LIKE BUTTON COLOR
  likeButton: {
    backgroundColor: '#4CAF50'
  },

  // BUTTON ICON STYLE
  buttonIcon: {
    fontSize: 24,
    color: '#fff'
  },

  // LEFT SWIPE LABEL STYLE
  nopeLabel: {
    backgroundColor: '#FF5252',
    color: 'white',
    fontSize: 28,
    padding: 10,
    borderRadius: 10
  },

  // RIGHT SWIPE LABEL STYLE
  likeLabel: {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: 28,
    padding: 10,
    borderRadius: 10
  }

});