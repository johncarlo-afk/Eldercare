// IMPORT REACT
import React from 'react';

// IMPORT NAVIGATION CONTAINER
import { NavigationContainer } from '@react-navigation/native';

// IMPORT STACK NAVIGATOR
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// IMPORT ALL SCREENS
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import SwipeScreen from '../screens/SwipeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import ScheduleListScreen from '../screens/ScheduleListScreen';
import NotificationScreen from '../screens/NotificationScreen';

// CREATE STACK
const Stack = createNativeStackNavigator();

// MAIN NAVIGATOR FUNCTION
export default function AppNavigator() {

  return (

    // WRAPS THE WHOLE NAVIGATION SYSTEM
    <NavigationContainer>

      {/* STACK NAVIGATION */}
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >

        {/* LOGIN SCREEN */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        {/* REGISTER SCREEN */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        {/* HOME SCREEN */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        {/* SWIPE SCREEN */}
        <Stack.Screen
          name="Swipe"
          component={SwipeScreen}
        />

        {/* PROFILE SCREEN */}
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
        />

        {/* SCHEDULE SCREEN */}
        <Stack.Screen
          name="Schedule"
          component={ScheduleScreen}
        />

        {/* SCHEDULE LIST SCREEN */}
        <Stack.Screen
          name="Schedules"
          component={ScheduleListScreen}
        />

        {/* NOTIFICATION SCREEN */}
        <Stack.Screen
          name="Notifications"
          component={NotificationScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}