// Import React and hooks
import React, { useState, useEffect } from 'react';

// Import UI components
import { View, Text, StyleSheet, Alert, Image } from 'react-native';

// Import swiper
import Swiper from 'react-native-deck-swiper';

// Import axios
import axios from 'axios';

// ✅ RECEIVE USER FROM LOGIN (VERY IMPORTANT)
export default function SwipeScreen({ route }) {

  const { user } = route.params; // get logged-in user
  const currentUser = user; // use as current user

  // Store users from database
  const [users, setUsers] = useState([]);

  // Store matches
  const [matches, setMatches] = useState([]);

  // Run when screen loads
  useEffect(() => {

    console.log("Fetching users from API...");

    axios.get('http://192.168.0.216/eldercare-api/get_users.php')
      .then(res => {

        console.log("API DATA:", res.data);

        if (!res.data || res.data.length === 0) {
          console.log("No users found");
          return;
        }

        // ✅ FILTER BASED ON REAL USER ROLE
        const filtered = res.data.filter(u => {

          // Do not include yourself
          if (u.id == currentUser.id) return false;

          // Senior sees caregivers/volunteers
          if (currentUser.role === 'Senior') {
            return u.role === 'Caregiver' || u.role === 'Volunteer';
          }

          // Caregiver/Volunteer sees seniors
          return u.role === 'Senior';
        });

        console.log("Filtered Users:", filtered);

        setUsers(filtered);
      })
      .catch(err => console.log("API ERROR:", err));

  }, []);

  // Swipe RIGHT (LIKE)
  const handleSwipeRight = (index) => {

    const selectedUser = users[index];

    if (!selectedUser) {
      console.log("No user found at index:", index);
      return;
    }

    console.log("RIGHT SWIPE:", selectedUser);

    axios.post('http://192.168.0.216/eldercare-api/swipe.php', {
      swiper_id: currentUser.id, // ✅ real user
      swiped_id: selectedUser.id,
      action: 'like'
    })
    .then(res => {

      console.log("Swipe response:", res.data);

      if (res.data.match) {
        setMatches(prev => [...prev, selectedUser]);

        Alert.alert("🎉 Match!", `You matched with ${selectedUser.name}`);
      }
    })
    .catch(err => console.log("SWIPE ERROR:", err));
  };

  // Swipe LEFT (PASS)
  const handleSwipeLeft = (index) => {

    const selectedUser = users[index];

    if (!selectedUser) {
      console.log("No user found on left swipe");
      return;
    }

    console.log("LEFT SWIPE:", selectedUser);
  };

  return (
    <View style={styles.container}>

      {/* Show logged in user */}
      <Text style={{ textAlign: 'center', marginTop: 40 }}>
        Logged in as: {currentUser.name} ({currentUser.role})
      </Text>

      {/* Show match count */}
      <Text style={{ textAlign: 'center', marginBottom: 10 }}>
        Matches: {matches.length}
      </Text>

      {/* Swiper */}
      <Swiper
        key={users.length}
        cards={users}

        renderCard={(card) => {

          if (!card) return <View />;

          return (
            <View style={styles.card}>

              <Image
                source={{
                  uri: card.image || 'https://via.placeholder.com/300'
                }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.name}>
                  {card.name}, {card.age || "N/A"}
                </Text>

                <Text>{card.role}</Text>
                <Text>{card.location}</Text>
              </View>

            </View>
          );
        }}

        onSwipedRight={handleSwipeRight}
        onSwipedLeft={handleSwipeLeft}
        stackSize={3}
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