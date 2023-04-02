import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import ChatScreen from '../screens/ChatScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default StackNavigator;
