import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import StackNavigator from './navigation/StackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {SpeechToTextProvider} from './hooks/useSpeechToText';
import {
  showFloatingBubble,
  hideFloatingBubble,
  requestPermission,
  initialize,
} from 'react-native-floating-bubble';
import {NativeEventEmitter, NativeModules} from 'react-native';
import {ModalProvider} from './hooks/useModal';
const {DeviceEventEmitter} = NativeModules;
const deviceEventEmitter = new NativeEventEmitter(DeviceEventEmitter);
const App = () => {
  useEffect(() => {
    requestPermission()
      .then(() => console.log('Permission Granted'))
      .catch(() => console.log('Permission is not granted'));

    // Initialize bubble manage
    initialize().then(() => console.log('Initialized the bubble mange'));

    // Show Floating Bubble: x=10, y=10 position of the bubble
    showFloatingBubble(10, 10).then(() => console.log('Floating Bubble Added'));
  }, []);

  return (
    <NavigationContainer>
      <SpeechToTextProvider>
        <ModalProvider>
          <StackNavigator />
        </ModalProvider>
      </SpeechToTextProvider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
