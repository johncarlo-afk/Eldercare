import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, route }) {

  // Receive logged-in user
  const { user } = route.params;

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome {user.name} 👋</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Swipe', { user })}
      >
        <Text style={styles.cardText}>❤️ Find Matches</Text>
        <Text style={styles.subText}>Start connecting with elders</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30
  },

  card: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 25,
    borderRadius: 20,
    elevation: 5,
    alignItems: 'center'
  },

  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF4081'
  },

  subText: {
    marginTop: 5,
    color: '#777'
  }
});