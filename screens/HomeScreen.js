// IMPORT REACT
import React from 'react';

// IMPORT COMPONENTS
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';

// HOME SCREEN
export default function HomeScreen({ navigation, route }) {

  // GET USER
  const { user } = route.params;

  return (

    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >

      <StatusBar
        backgroundColor="#EAF4FF"
        barStyle="dark-content"
      />

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.greeting}>
          Hello 👋
        </Text>

        <Text style={styles.name}>
          {user.name}
        </Text>

        <Text style={styles.subtitle}>
          Welcome to ElderCare Matter
        </Text>

      </View>

      {/* FIND MATCHES */}
      <TouchableOpacity

        style={[styles.card, styles.blueCard]}

        onPress={() =>
          navigation.navigate('Swipe', { user })
        }
      >

        <Text style={styles.cardIcon}>
          ❤️
        </Text>

        <Text style={styles.cardTitle}>
          Find Companions
        </Text>

        <Text style={styles.cardSubtitle}>
          Start Connecting with others
        </Text>

      </TouchableOpacity>

      {/* PROFILE BUTTON CARD */}
      {/* SCHEDULES */}
      <TouchableOpacity

        style={[styles.card, styles.greenCard]}

        onPress={() =>
          navigation.navigate('Schedules', { user })
        }
      >

        <Text style={styles.cardIcon}>
          📅
        </Text>

        <Text style={styles.cardTitle}>
          My Schedules
        </Text>

        <Text style={styles.cardSubtitle}>
          Check upcoming meetings
        </Text>

      </TouchableOpacity>

      {/* NOTIFICATIONS */}
      <TouchableOpacity

        style={[styles.card, styles.orangeCard]}

        onPress={() =>
          navigation.navigate(
            'Notifications',
            { user }
          )
        }
      >

        <Text style={styles.cardIcon}>
          🔔
        </Text>

        <Text style={styles.cardTitle}>
          Notifications
        </Text>

        <Text style={styles.cardSubtitle}>
          Alerts and important updates
        </Text>

      </TouchableOpacity>

      {/* PROFILE */}
      <TouchableOpacity

        style={[styles.card, styles.whiteCard]}

        onPress={() =>
          navigation.navigate('Profile', { user })
        }
      >

        <Text style={styles.cardIcon}>
          👤
        </Text>

        <Text style={styles.cardTitle}>
          My Profile
        </Text>

        <Text style={styles.cardSubtitle}>
          Edit your account information
        </Text>

      </TouchableOpacity>

    </ScrollView>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    padding: 22,
    backgroundColor: '#EAF4FF',
    flexGrow: 1
  },

  header: {
    marginTop: 30,
    marginBottom: 30
  },

  greeting: {
    fontSize: 18,
    color: '#666'
  },

  name: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#1E3A5F'
  },

  subtitle: {
    marginTop: 6,
    color: '#6B7280',
    fontSize: 16
  },

  card: {
    borderRadius: 28,
    padding: 25,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5
  },

  blueCard: {
    backgroundColor: '#D9EEFF'
  },

  greenCard: {
    backgroundColor: '#DDF5E5'
  },

  orangeCard: {
    backgroundColor: '#FFE9D6'
  },

  whiteCard: {
    backgroundColor: '#FFFFFF'
  },

  cardIcon: {
    fontSize: 38,
    marginBottom: 12
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E3A5F'
  },

  cardSubtitle: {
    marginTop: 6,
    fontSize: 15,
    color: '#555'
  }

});