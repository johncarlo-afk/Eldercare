// Import React and hooks (useState = state, useEffect = lifecycle)
import React, { useState, useEffect } from 'react';

// Import UI components from React Native
import { View, Text, StyleSheet, Alert, Image } from 'react-native';

// Import Tinder-style swiper library
import Swiper from 'react-native-deck-swiper';

// Import axios for API requests
import axios from 'axios';

// Simulated logged-in user (later from login system)
const currentUser = {
  id: 1,
  role: 'Senior'
};

export default function SwipeScreen() {

  // State to store users from database
  const [users, setUsers] = useState([]);

  // State to store matches
  const [matches, setMatches] = useState([]);

  // Runs once when screen loads
  useEffect(() => {

    console.log("Fetching users from API...");

    // API call to get users from PHP
    axios.get('http://192.168.0.216/eldercare-api/get_users.php')
      .then(res => {

        console.log("API DATA:", res.data); // Debug log

        // If no data returned, stop
        if (!res.data || res.data.length === 0) {
          console.log("No users found in database");
          return;
        }

        // Filter users based on role
        const filtered = res.data.filter(user => {

          // If current user is Senior → show Caregiver/Volunteer
          if (currentUser.role === 'Senior') {
            return user.role === 'Caregiver' || user.role === 'Volunteer';
          }

          // If Caregiver/Volunteer → show Seniors
          return user.role === 'Senior';
        });

        console.log("Filtered Users:", filtered); // Debug log

        // Save filtered users into state
        setUsers(filtered);
      })
      .catch(err => {
        console.log("API ERROR:", err);
      });

  }, []); // empty = run once only

  // Function when user swipes RIGHT (LIKE)
  const handleSwipeRight = (index) => {

    const user = users[index]; // get swiped user

    if (!user) {
      console.log("No user found at index:", index);
      return;
    }

    console.log("RIGHT SWIPE:", user);

    // Send swipe to backend
    axios.post('http://192.168.0.216/eldercare-api/swipe.php', {
      swiper_id: currentUser.id,
      swiped_id: user.id,
      action: 'like'
    })
    .then(res => {

      console.log("Swipe response:", res.data);

      // If match found
      if (res.data.match) {
        setMatches(prev => [...prev, user]); // add to matches

        Alert.alert("🎉 Match!", `You matched with ${user.name}`);
      }
    })
    .catch(err => console.log("SWIPE ERROR:", err));
  };

  // Function when user swipes LEFT (PASS)
  const handleSwipeLeft = (index) => {

    const user = users[index];

    if (!user) {
      console.log("No user found on left swipe");
      return;
    }

    console.log("LEFT SWIPE:", user);
  };

  return (
    <View style={styles.container}>

      {/* Show current role */}
      <Text style={{ textAlign: 'center', marginTop: 40 }}>
        Logged in as: {currentUser.role}
      </Text>

      {/* Show number of matches */}
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>
        Matches: {matches.length}
      </Text>

      {/* Swiper component */}
      <Swiper
        key={users.length} // 🔥 force re-render when users change
        cards={users} // data source

        // Render each card
        renderCard={(card) => {

          if (!card) return <View />; // prevent crash

          return (
            <View style={styles.card}>

              {/* Profile Image */}
              <Image
                source={{
                  uri: card.image || 'https://via.placeholder.com/300' // fallback image
                }}
                style={styles.image}
              />

              {/* User Info */}
              <View style={styles.info}>
                <Text style={styles.name}>
                  {card.name || "No Name"}, {card.age || "N/A"}
                </Text>

                <Text>{card.role || "No Role"}</Text>
                <Text>{card.location || "No Location"}</Text>
              </View>

            </View>
          );
        }}

        onSwipedRight={handleSwipeRight} // swipe right handler
        onSwipedLeft={handleSwipeLeft}   // swipe left handler
        stackSize={3} // number of stacked cards
      />

    </View>
  );
}

// Styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2'
  },

  card: {
    flex: 1,
    borderRadius: 20,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 5
  },

  image: {
    width: '100%',
    height: '65%'
  },

  info: {
    padding: 15
  },

  name: {
    fontSize: 22,
    fontWeight: 'bold'
  }

});