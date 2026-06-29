// IMPORT REACT
import React, { useEffect, useState } from 'react';

// IMPORT COMPONENTS
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert
} from 'react-native';

// IMPORT AXIOS
import axios from 'axios';

// MAIN SCREEN
export default function ScheduleListScreen({ route, navigation }) {

  // GET LOGGED-IN USER
  const { user } = route.params;

  // STORE SCHEDULES
  const [schedules, setSchedules] = useState([]);

  // LOADING STATE
  const [loading, setLoading] = useState(true);

  // LOAD SCHEDULES WHEN SCREEN OPENS
  useEffect(() => {

    axios.get(
      `http://192.168.0.216/eldercare-api/get_schedules.php?user_id=${user.id}`
    )

    .then(res => {

      console.log("SCHEDULES:", res.data);

      // SAVE SCHEDULES
      setSchedules(res.data);

      // STOP LOADING
      setLoading(false);

    })

    .catch(err => {

      console.log(err);

      setLoading(false);
    });

  }, []);

  // UPDATE SCHEDULE STATUS
  const updateScheduleStatus = (

    scheduleId,
    status

  ) => {

    axios.post(

      'http://192.168.0.216/eldercare-api/update_schedule_status.php',

      {
        schedule_id: scheduleId,
        status: status
      }

    )

    .then(res => {

      console.log(res.data);

      // UPDATE UI WITHOUT RELOADING
      const updatedSchedules = schedules.map(schedule => {

        // CHECK CURRENT SCHEDULE
        if (schedule.id == scheduleId) {

          // UPDATE STATUS
          return {
            ...schedule,
            status: status
          };
        }

        return schedule;
      });

      // SAVE UPDATED SCHEDULES
      setSchedules(updatedSchedules);

      // SUCCESS MESSAGE
      Alert.alert(
        'Success',
        `Schedule ${status}`
      );

    })

    .catch(err => {

      console.log(err);

      Alert.alert(
        'Error',
        'Failed to update status'
      );
    });
  };

  // LOADING SCREEN
  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#2196F3"
        />

      </View>
    );
  }

  return (

    <View style={styles.container}>

      {/* TITLE */}
      <Text style={styles.title}>
        My Schedules
      </Text>

      {/* IF NO SCHEDULE */}
      {schedules.length === 0 ? (

        <Text style={styles.emptyText}>
          No schedules found
        </Text>

      ) : (

        <FlatList

          data={schedules}

          // CREATE UNIQUE KEY
          keyExtractor={(item, index) =>
            item.id
              ? item.id.toString() + index
              : index.toString()
          }

          renderItem={({ item }) => (

            <View style={styles.card}>

              {/* PARTNER NAME */}
              <Text style={styles.name}>
                Meeting with {item.partner_name}
              </Text>

              {/* DATE */}
              <Text style={styles.info}>
                📅 {item.meeting_date}
              </Text>

              {/* TIME */}
              <Text style={styles.info}>
                ⏰ {item.meeting_time}
              </Text>

              {/* LOCATION */}
              <Text style={styles.info}>
                📍 {item.meeting_location}
              </Text>

              {/* EMERGENCY CONTACT */}
              <Text style={styles.info}>
                📞 {item.emergency_contact}
              </Text>

              {/* STATUS */}
              <Text style={styles.status}>
                Status: {item.status}
              </Text>

              {/* ACTION BUTTONS */}
              <View>

                {/* ACCEPT / REJECT */}
                {
                  item.status === 'Pending' &&
                  item.created_by &&
                  Number(item.created_by) !== Number(user.id) && (

                    <>

                      <TouchableOpacity
                        style={styles.acceptButton}
                        onPress={() =>
                          updateScheduleStatus(
                            item.id,
                            'Approved'
                          )
                        }
                      >

                        <Text style={styles.buttonText}>
                          Accept
                        </Text>

                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.rejectButton}
                        onPress={() =>
                          updateScheduleStatus(
                            item.id,
                            'Cancelled'
                          )
                        }
                      >

                        <Text style={styles.buttonText}>
                          Reject
                        </Text>

                      </TouchableOpacity>

                    </>
                  )
                }

                {/* COMPLETE BUTTON */}
                {
                  item.status === 'Approved' && (

                    <TouchableOpacity

                      style={styles.completeButton}

                      onPress={() =>
                        updateScheduleStatus(
                          item.id,
                          'Completed'
                        )
                      }
                    >

                      <Text style={styles.buttonText}>
                        Complete Schedule
                      </Text>

                    </TouchableOpacity>

                  )
                }

                <TouchableOpacity

                  style={styles.chatButton}

                  onPress={() =>

                    navigation.navigate(

                      'Chat',

                      {

                        currentUser: {
                          id: user.id
                        },

                        otherUser: {

                          id:

                            item.partner_id == user.id

                              ? item.senior_id

                              : item.partner_id

                        }

                      }

                    )

                  }
                >

                  <Text style={styles.buttonText}>
                    Message
                  </Text>

                </TouchableOpacity>

                {/* RATE BUTTON */}
                {
                  item.status === 'Completed' && (

                    <TouchableOpacity

                      style={styles.rateButton}

                      onPress={() =>

                        navigation.navigate(

                          'RatingScreen',

                          {
                            schedule: item,
                            user: user
                          }

                        )
                      }
                    >

                      <Text style={styles.buttonText}>
                        Rate User
                      </Text>

                    </TouchableOpacity>

                  )
                }

              </View>

              {/* NOTES */}
              {item.notes ? (

                <Text style={styles.notes}>
                  📝 {item.notes}
                </Text>

              ) : null}

            </View>
          )}
        />
      )}

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  // MAIN CONTAINER
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 20
  },

  // LOADING SCREEN
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  // SCREEN TITLE
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center'
  },

  // EMPTY TEXT
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 50
  },

  // CARD DESIGN
  card: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3
  },

  // NAME DESIGN
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2196F3'
  },

  // INFO TEXT
  info: {
    fontSize: 16,
    marginBottom: 5
  },

  // STATUS TEXT
  status: {
    marginTop: 5,
    fontWeight: 'bold',
    color: '#4CAF50'
  },

  // ACCEPT BUTTON
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  // REJECT BUTTON
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  // BUTTON TEXT
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },

  // NOTES DESIGN
  notes: {
    marginTop: 10,
    color: '#555'
  },

  completeButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  rateButton: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 10,
    marginTop: 10
  },

  chatButton: {
  backgroundColor: '#9C27B0',
  padding: 12,
  borderRadius: 10,
  marginTop: 10
},

});