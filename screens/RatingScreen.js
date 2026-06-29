// IMPORT REACT
import React, { useState } from 'react';

// IMPORT COMPONENTS
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

// IMPORT AXIOS
import axios from 'axios';

// SCREEN
export default function RatingScreen({

  route,
  navigation

}) {

  // GET DATA
  const { schedule, user } = route.params;

  // STATES
  const [rating, setRating] = useState(0);

  const [liked, setLiked] = useState(false);

  const [feedback, setFeedback] = useState('');

  // SUBMIT
  const submitRating = () => {

    axios.post(

      'http://192.168.0.216/eldercare-api/submit_rating.php',

      {

        schedule_id: schedule.id,

        reviewer_id: user.id,

        reviewed_user_id:
          schedule.partner_id,

        rating: rating,

        liked: liked ? 1 : 0,

        feedback: feedback

      }

    )

    .then(res => {

      if (res.data.status === 'success') {

        Alert.alert(
          'Success',
          'Rating submitted!'
        );

        navigation.goBack();

        } 
      
      else if (
        res.data.status === 'already_rated'
        ) {

        Alert.alert(
            'Already Rated',
            'You already rated this schedule.'
        );
        }
      
      else {

        Alert.alert(
          'Error',
          'Failed to submit rating'
        );
      }

    })

    .catch(err => {

      console.log(err);

      Alert.alert(
        'Error',
        'Server error'
      );
    });
  };

  return (

    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>
        Rate User
      </Text>

      {/* STARS */}
      <View style={styles.starContainer}>

        {[1,2,3,4,5].map(star => (

          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
          >

            <Text style={styles.star}>
              {star <= rating ? '⭐' : '☆'}
            </Text>

          </TouchableOpacity>

        ))}

      </View>

      {/* LIKE BUTTON */}
      <TouchableOpacity

        style={[
          styles.likeButton,
          liked && styles.liked
        ]}

        onPress={() =>
          setLiked(!liked)
        }
      >

        <Text style={styles.likeText}>
          👍 Like
        </Text>

      </TouchableOpacity>

      {/* FEEDBACK */}
      <TextInput

        style={styles.input}

        placeholder="Write feedback..."

        multiline

        value={feedback}

        onChangeText={setFeedback}

      />

      {/* SUBMIT */}
      <TouchableOpacity

        style={styles.submitButton}

        onPress={submitRating}
      >

        <Text style={styles.submitText}>
          Submit Rating
        </Text>

      </TouchableOpacity>

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F7FA'
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 30,
    textAlign: 'center'
  },

  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30
  },

  star: {
    fontSize: 45,
    marginHorizontal: 5
  },

  likeButton: {
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20
  },

  liked: {
    backgroundColor: '#2196F3'
  },

  likeText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#000'
  },

  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 20
  },

  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12
  },

  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  }

});