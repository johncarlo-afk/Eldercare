import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation, route }) {

  // Receive logged-in user
  const { user } = route.params;

  return (
    <View style={styles.container}>

      {/* Show user name */}
      <Text style={styles.title}>Welcome {user.name} 👋</Text>

      {/* Navigate to swipe with user */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Swipe', { user })}
      >
        <Text style={styles.buttonText}>Find Matches</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: '#FF4081',
    padding: 15,
    borderRadius: 8
  },
  buttonText: { color: '#fff' }
});