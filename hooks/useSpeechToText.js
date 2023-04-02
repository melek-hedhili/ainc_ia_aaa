import React, {useContext, useState, createContext, useMemo} from 'react';
const SpeechToTextContext = createContext({});
import Voice from '@react-native-voice/voice';
export const SpeechToTextProvider = ({children}) => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  Voice.onSpeechStart = () => setIsRecording(true);
  Voice.onSpeechEnd = () => setIsRecording(false);
  Voice.onSpeechError = err => setError(err.error);
  Voice.onSpeechResults = result => {
    console.log(result);
    setResult(result.value[0]);
  };
  const startRecording = async () => {
    try {
      console.log('recording');
      await Voice.start('en-US');
      console.log(' en recording');
    } catch (error) {
      console.log(error);
    }
  };
  const stopRecording = async () => {
    try {
      console.log('stop recording');
      await Voice.stop();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SpeechToTextContext.Provider
      value={{
        result,
        error,
        isRecording,
        startRecording,
        stopRecording,
        setResult,
      }}>
      {children}
    </SpeechToTextContext.Provider>
  );
};

export default function useSpeechToText() {
  return useContext(SpeechToTextContext);
}
