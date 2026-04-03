import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Swipe')}
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