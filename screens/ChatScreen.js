// IMPORT REACT
import React, {
  useState,
  useEffect
} from 'react';

// IMPORT COMPONENTS
import {
  View,
 Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';

// IMPORT AXIOS
import axios from 'axios';

// IMPORT SOCKET
import io from "socket.io-client";

// SOCKET CONNECTION
const socket = io(
  "http://192.168.0.216:3000"
);

// SCREEN
export default function ChatScreen({

  route

}) {

  const {

    currentUser,
    otherUser

  } = route.params;

  // STATES
  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState('');

  // UNIQUE ROOM
  const room = `${Math.min(
    currentUser.id,
    otherUser.id
  )}_${Math.max(
    currentUser.id,
    otherUser.id
  )}`;

  // LOAD OLD MESSAGES
  const loadMessages = () => {

    axios.get(

      `http://192.168.0.216/eldercare-api/get_messages.php?sender_id=${currentUser.id}&receiver_id=${otherUser.id}`

    )

    .then(res => {

      setMessages(res.data);

    })

    .catch(err => {

      console.log(err);

    });
  };

  // INITIAL LOAD
  useEffect(() => {

    loadMessages();

  }, []);

  // JOIN ROOM
  useEffect(() => {

    socket.emit(
      "join_room",
      room
    );

  }, []);

  // RECEIVE REAL-TIME MESSAGE
  useEffect(() => {

    socket.on(
      "receive_message",
      (data) => {

        setMessages((prev) => [

          ...prev,

          {
            id: Date.now(),
            sender_id: data.sender_id,
            receiver_id: data.receiver_id,
            message: data.message
          }

        ]);

      }
    );

    return () => {

      socket.off("receive_message");

    };

  }, []);

  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim()) return;

    // SEND TO SOCKET SERVER
    socket.emit(

      "send_message",

      {

        sender_id:
          currentUser.id,

        receiver_id:
          otherUser.id,

        message:
          message,

        room:
          room

      }

    );

    setMessage('');

  };

  return (

    <View style={styles.container}>

      {/* CHAT */}
      <FlatList

        data={messages}

        keyExtractor={(item, index) =>
          index.toString()
        }

        renderItem={({ item }) => (

          <View

            style={[

              styles.messageContainer,

              item.sender_id ==
              currentUser.id

                ? styles.myMessage

                : styles.otherMessage

            ]}
          >

            <Text style={styles.messageText}>
              {item.message}
            </Text>

          </View>

        )}
      />

      {/* INPUT */}
      <View style={styles.inputContainer}>

        <TextInput

          style={styles.input}

          placeholder="Type message..."

          value={message}

          onChangeText={setMessage}

        />

        <TouchableOpacity

          style={styles.sendButton}

          onPress={sendMessage}
        >

          <Text style={styles.sendText}>
            Send
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

// STYLES
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },

  messageContainer: {
    padding: 12,
    margin: 10,
    borderRadius: 12,
    maxWidth: '75%'
  },

  myMessage: {
    backgroundColor: '#2196F3',
    alignSelf: 'flex-end'
  },

  otherMessage: {
    backgroundColor: '#E0E0E0',
    alignSelf: 'flex-start'
  },

  messageText: {
    color: '#000'
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff'
  },

  input: {
    flex: 1,
    backgroundColor: '#F1F1F1',
    borderRadius: 12,
    paddingHorizontal: 15
  },

  sendButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 12,
    marginLeft: 10
  },

  sendText: {
    color: '#fff',
    fontWeight: 'bold'
  }

});