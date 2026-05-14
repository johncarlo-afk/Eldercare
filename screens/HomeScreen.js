// IMPORT REACT
import React from 'react';

// IMPORT UI COMPONENTS
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

// HOME SCREEN COMPONENT
export default function HomeScreen({ navigation, route }) {

  // GET LOGGED-IN USER DATA
  const { user } = route.params;

  return (

    // MAIN SCREEN CONTAINER
    <View style={styles.container}>

      {/* WELCOME MESSAGE */}
      <Text style={styles.title}>
        Welcome {user.name} 👋
      </Text>

      {/* FIND MATCHES BUTTON CARD */}
      <TouchableOpacity

        style={styles.card}

        // GO TO SWIPE SCREEN
        onPress={() =>
          navigation.navigate('Swipe', { user })
        }
      >

        {/* CARD TITLE */}
        <Text style={styles.cardText}>
          ❤️ Find Matches
        </Text>

        {/* CARD DESCRIPTION */}
        <Text style={styles.subText}>
          Start connecting with elders
        </Text>

      </TouchableOpacity>

      {/* SCHEDULES CARD */}
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Schedules', { user })
        }
      >

        <Text style={styles.cardText}>
          📅 My Schedules
        </Text>

        <Text style={styles.subText}>
          View upcoming meetings
        </Text>

      </TouchableOpacity>

      {/* NOTIFICATIONS BUTTON */}
      <TouchableOpacity

        style={styles.card}

        onPress={() =>
          navigation.navigate(
            'Notifications',
            { user }
          )
        }
      >

        <Text style={styles.cardText}>
          🔔 Notifications
        </Text>

        <Text style={styles.subText}>
          View updates and alerts
        </Text>

      </TouchableOpacity>

      {/* PROFILE BUTTON CARD */}
      <TouchableOpacity

        style={[styles.card, styles.profileCard]}

        // GO TO PROFILE SCREEN
        onPress={() =>
          navigation.navigate('Profile', { user })
        }
      >

        {/* PROFILE CARD TITLE */}
        <Text style={styles.cardText}>
          👤 My Profile
        </Text>

        {/* PROFILE CARD DESCRIPTION */}
        <Text style={styles.subText}>
          View and edit your info
        </Text>

      </TouchableOpacity>

    </View>
  );
}

// SCREEN STYLES
const styles = StyleSheet.create({

  // MAIN CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  // WELCOME TITLE DESIGN
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },

  // CARD DESIGN
  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center',
    marginBottom: 15
  },

  // PROFILE CARD BORDER DESIGN
  profileCard: {
    borderWidth: 1,
    borderColor: '#ddd'
  },

  // CARD TITLE DESIGN
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4081'
  },

  // CARD SUBTITLE DESIGN
  subText: {
    marginTop: 5,
    color: '#777'
  }

});