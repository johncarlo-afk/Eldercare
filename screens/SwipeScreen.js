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
  StatusBar
} from 'react-native';

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

  const swiperRef = useRef(null);

  // LOAD USERS
  useEffect(() => {

    axios.get(
      'http://192.168.0.216/eldercare-api/get_users.php'
    )

    .then(res => {

      if (!res.data) return;

      const filtered = res.data.filter(u => {

        if (u.id == currentUser.id) {
          return false;
        }

        if (currentUser.role === 'Senior') {

          return (
            u.role === 'Caregiver' ||
            u.role === 'Volunteer'
          );
        }

        return u.role === 'Senior';
      });

      setUsers(filtered);

    })

    .catch(err => console.log(err));

  }, []);

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

  return (

    <View style={styles.container}>

      <StatusBar
        backgroundColor="#EAF4FF"
        barStyle="dark-content"
      />

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.title}>
          Find Companions
        </Text>

        <Text style={styles.matchText}>
          ❤️ Matches: {matches.length}
        </Text>

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
                  {card.name}, {card.age}
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

              </View>

              {/* BUTTONS */}
              <View style={styles.buttons}>

                {/* PASS */}
                <TouchableOpacity

                  style={[
                    styles.actionButton,
                    styles.passButton
                  ]}

                  onPress={() =>
                    swiperRef.current?.swipeLeft()
                  }
                >

                  <Text style={styles.buttonText}>
                    ❌
                  </Text>

                </TouchableOpacity>

                {/* LIKE */}
                <TouchableOpacity

                  style={[
                    styles.actionButton,
                    styles.likeButton
                  ]}

                  onPress={() =>
                    swiperRef.current?.swipeRight()
                  }
                >

                  <Text style={styles.buttonText}>
                    ❤️
                  </Text>

                </TouchableOpacity>

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
    marginTop: 80,
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

  swiperContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 110
  },

  card: {
    flex: 0.78,
    borderRadius: 30,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 6
  },

  image: {
    width: '100%',
    height: '65%'
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
  }

});