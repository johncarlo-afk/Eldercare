import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import axios from 'axios';

export default function SwipeScreen({ route }) {

  const { user } = route.params;
  const currentUser = user;

  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);

  const swiperRef = useRef(null);

  useEffect(() => {
    axios.get('http://192.168.0.216/eldercare-api/get_users.php')
      .then(res => {
        if (!res.data) return;

        const filtered = res.data.filter(u => {
          if (u.id == currentUser.id) return false;

          if (currentUser.role === 'Senior') {
            return u.role === 'Caregiver' || u.role === 'Volunteer';
          }

          return u.role === 'Senior';
        });

        setUsers(filtered);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSwipeRight = (index) => {
    const selectedUser = users[index];
    if (!selectedUser) return;

    axios.post('http://192.168.0.216/eldercare-api/swipe.php', {
      swiper_id: currentUser.id,
      swiped_id: selectedUser.id,
      action: 'like'
    })
    .then(res => {
      if (res.data.match) {
        setMatches(prev => [...prev, selectedUser]);
        Alert.alert("🎉 Match!", `You matched with ${selectedUser.name}`);
      }
    });
  };

  const handleSwipeLeft = (index) => {
    const selectedUser = users[index];
    if (!selectedUser) return;
  };

  return (
    <View style={styles.container}>

      {/* HEADER (FIXED) */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Elder Care Matters</Text>
        <Text style={styles.matchText}>Matches: {matches.length}</Text>
      </View>

      {/* SWIPER AREA */}
      <View style={styles.swiperWrapper}>
        <Swiper
          ref={swiperRef}
          cards={users}
          key={users.length}

          containerStyle={styles.swiperContainer} // 👈 KEY FIX

          renderCard={(card) => {
            if (!card) return <View />;

            return (
              <View style={styles.card}>

                <Image source={{ uri: card.image }} style={styles.image} />
                <View style={styles.gradient} />

                {/* INFO */}
                <View style={styles.infoContainer}>
                  <Text style={styles.name}>{card.name}, {card.age || "N/A"}</Text>
                  <Text style={styles.role}>{card.role}</Text>
                  <Text style={styles.location}>📍 {card.location}</Text>
                </View>

                {/* BUTTONS INSIDE CARD */}
                <View style={styles.cardButtons}>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.passButton]}
                    onPress={() => swiperRef.current?.swipeLeft()}
                  >
                    <Text style={styles.buttonIcon}>❌</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.likeButton]}
                    onPress={() => swiperRef.current?.swipeRight()}
                  >
                    <Text style={styles.buttonIcon}>❤️</Text>
                  </TouchableOpacity>

                </View>

              </View>
            );
          }}

          onSwipedRight={handleSwipeRight}
          onSwipedLeft={handleSwipeLeft}
          stackSize={3}

          overlayLabels={{
            left: { title: 'NOPE', style: { label: styles.nopeLabel } },
            right: { title: 'LIKE', style: { label: styles.likeLabel } }
          }}

          animateOverlayLabelsOpacity
          animateCardOpacity
        />
      </View>

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },

  // ✅ HEADER FIXED
  header: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },

  appTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333'
  },

  matchText: {
    color: '#FF4081',
    fontWeight: 'bold'
  },

  // ✅ WRAPPER TO PREVENT OVERLAP
  swiperWrapper: {
    flex: 1
  },

  swiperContainer: {
    marginTop: 10
  },

  card: {
    flex: 1,
    borderRadius: 25,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 8,
    margin: 10
  },

  image: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)'
  },

  infoContainer: {
    position: 'absolute',
    bottom: 100,
    left: 20
  },

  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold'
  },

  role: {
    color: '#FF4081'
  },

  location: {
    color: '#fff'
  },

  cardButtons: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },

  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },

  passButton: {
    backgroundColor: '#FF5252'
  },

  likeButton: {
    backgroundColor: '#4CAF50'
  },

  buttonIcon: {
    fontSize: 24,
    color: '#fff'
  },

  nopeLabel: {
    backgroundColor: '#FF5252',
    color: 'white',
    fontSize: 28,
    padding: 10,
    borderRadius: 10
  },

  likeLabel: {
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: 28,
    padding: 10,
    borderRadius: 10
  }

});