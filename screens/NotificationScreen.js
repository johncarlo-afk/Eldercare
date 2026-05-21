// IMPORT REACT
import React, { useEffect, useState } from 'react';

// IMPORT COMPONENTS
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

// IMPORT AXIOS
import axios from 'axios';

// SCREEN
export default function NotificationScreen({ route }) {

  // GET USER
  const { user } = route.params;

  // STORE NOTIFICATIONS
  const [notifications, setNotifications] = useState([]);

  // LOAD NOTIFICATIONS
  useEffect(() => {

    axios.get(
      `https://lightcoral-armadillo-536796.hostingersite.com/eldercare-api/get_notifications.php?user_id=${user.id}`
    )

    .then(res => {

      setNotifications(res.data);

    })

    .catch(err => {
      console.log(err);
    });

  }, []);

  return (

    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>
        Notifications
      </Text>

      <FlatList

        data={notifications}

        keyExtractor={(item) =>
          item.id.toString()
        }

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Text style={styles.message}>
              {item.message}
            </Text>

            <Text style={styles.date}>
              {item.created_at}
            </Text>

          </View>
        )}
      />

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3
  },

  message: {
    fontSize: 16,
    fontWeight: 'bold'
  },

  date: {
    marginTop: 5,
    color: '#777',
    fontSize: 12
  }

});