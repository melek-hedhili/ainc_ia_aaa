import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import {SIZES} from '../constants/theme';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Tts from 'react-native-tts';
import SystemSetting from 'react-native-system-setting';
import useModal from '../hooks/useModal';
const SplashScreen = () => {
  const navigation = useNavigation();
  const [timer, seTtimer] = useState(5);
  const {showActivityIndicator, hideActivityIndicator} = useModal();
  Tts.setDefaultLanguage('en-IE');
  useEffect(() => {
    Tts.speak(
      'Hello and welcome to this app !, To navigate press on volume down',
      {
        iosVoiceId: 'com.apple.ttsbundle.Moira-compact',
        rate: 0.5,
      },
    );
    const volumeListener = SystemSetting.addVolumeListener(data => {
      const volume = data.value;
      if (volume <= data.value) {
        navigation.navigate('Chat');
      }

      console.log(data);
    });
  }, []);
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/ai-splash.json')}
        autoPlay
        loop={true}
      />
      <View style={{position: 'absolute', bottom: 30, alignSelf: 'center'}}>
        <Button
          icon="arrow-right"
          mode="contained"
          onPress={() => {
            navigation.navigate('Chat');
          }}>
          Click here to continue
        </Button>
        {/* <Text style={{textAlign: 'center'}}>
          This countdown is made for blind people if that cant press the button
          above {timer}
        </Text> */}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
