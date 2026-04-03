import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';


// Dummy users
const receivedLikes = [
  { id: 3, name: 'Ana' } // pretend Ana already liked you
];
const currentUser = {
  id: 99,
  role: 'Senior' // try: 'Senior', 'Caregiver', 'Volunteer'
};
const initialUsers = [
  {
    id: 1,
    name: 'Lola Maria',
    age: 70,
    role: 'Senior',
    location: 'Pampanga',
    bio: 'Looking for a companion to talk with daily.',
    image: 'https://i.pravatar.cc/300?img=5'
  },
  {
    id: 2,
    name: 'Mang Juan',
    age: 65,
    role: 'Senior',
    location: 'Angeles City',
    bio: 'Needs help with medical checkups.',
    image: 'https://i.pravatar.cc/300?img=12'
  },
  {
    id: 3,
    name: 'Ana',
    age: 28,
    role: 'Caregiver',
    location: 'San Fernando',
    bio: 'Experienced caregiver with 5 years experience.',
    image: 'https://i.pravatar.cc/300?img=20'
  }
];

export default function SwipeScreen() {
  const getFilteredUsers = () => {
    if (currentUser.role === 'Senior') {
        return initialUsers.filter(
        user => user.role === 'Caregiver' || user.role === 'Volunteer'
        );
    }

    if (currentUser.role === 'Caregiver' || currentUser.role === 'Volunteer') {
        return initialUsers.filter(user => user.role === 'Senior');
    }

    return initialUsers;
    };

    const [users, setUsers] = useState(getFilteredUsers());
  const [likes, setLikes] = useState([]); // store liked users
  const [matches, setMatches] = useState([]);

  const handleSwipeRight = (index) => {
    const likedUser = users[index];

    console.log('Liked:', likedUser);

    // Save like
    setLikes((prev) => [...prev, likedUser]);

    // Check if that user already liked YOU
    const isMatch = receivedLikes.find(u => u.id === likedUser.id);

    if (isMatch) {
        setMatches((prev) => [...prev, likedUser]);

        Alert.alert(
        "🎉 It's a Match!",
        `You and ${likedUser.name} liked each other!`
        );
    }
    };

  const handleSwipeLeft = (index) => {
    console.log('Passed:', users[index]);
  };

  return (
    <View style={styles.container}>
        <Text style={{ textAlign: 'center', marginTop: 40 }}>
            Logged in as: {currentUser.role}
        </Text>
        <Text style={{ textAlign: 'center', marginBottom: 10 }}>
        Matches: {matches.length}
        </Text>
      <Swiper
        cards={users}
        renderCard={(card) => {
            if (!card) return <View />;

            return (
            <View style={styles.card}>
                <Image source={{ uri: card.image }} style={styles.image} />
                <View style={styles.info}>
                <Text style={styles.name}>{card.name}, {card.age}</Text>
                <Text>{card.role}</Text>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },

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
  },

  role: {
    color: '#FF4081',
    fontWeight: 'bold',
    marginTop: 5
  },

  location: {
    marginTop: 5,
    color: 'gray'
  },

  bio: {
    marginTop: 10,
    fontSize: 14
  }
});