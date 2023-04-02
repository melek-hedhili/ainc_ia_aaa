import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Dialogflow_V2} from 'react-native-dialogflow';
import {dialogflowConfig} from '../constants/env';
import {Button} from 'react-native-paper';
import Voice from '@react-native-voice/voice';
import useSpeechToText from '../hooks/useSpeechToText';
import {NativeEventEmitter, NativeModules} from 'react-native';
const {DeviceEventEmitter} = NativeModules;
const deviceEventEmitter = new NativeEventEmitter(DeviceEventEmitter);
import Tts from 'react-native-tts';
const botAvatar = require('../assets/images/bot-avatar.jpg');
const BOT = {
  _id: 2,
  name: 'Mr.Bot',
  avatar: botAvatar,
};

const ChatScreen = () => {
  const {result, error, isRecording, startRecording, stopRecording, setResult} =
    useSpeechToText();
  deviceEventEmitter.addListener('floating-bubble-press', e => {
    // What to do when user press the bubble
    console.log('Press Bubble');
    startRecording();
  });
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: `Hi! I am the FAQ bot 🤖 from Jscrambler.\n\nHow may I help you with today?`,
      createdAt: new Date(),
      user: BOT, // <= note this
    },
  ]);
  const handleGoogleResponse = result => {
    console.log(result.queryResult.fulfillmentMessages[0].text.text[0]);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  };
  const sendBotResponse = text => {
    let msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT,
    };
    setMessages(previousMessages => {
      return GiftedChat.append(previousMessages, [msg]);
    });
    Tts.speak(`${text}`, {
      iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
      rate: 0.5,
    });
  };
  const onSend = (messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => handleGoogleResponse(result),
      error => console.log(error),
    );
    setResult('');
  };
  const onQuickReply = quickReply => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, quickReply),
    );
    let message = quickReply[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => handleGoogleResponse(result),
      error => console.log('error', error),
    );
  };
  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }, []);

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={message => onSend(message)}
        onQuickReply={quickReply => onQuickReply(quickReply)}
        text={result.length > 0 ? result : null}
        alwaysShowSend
        textInputProps={{
          color: 'red',
        }}
        user={{_id: 1}}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
