import {StyleSheet, Text, View, Modal, ActivityIndicator} from 'react-native';
import LottieView from 'lottie-react-native';
import React, {useContext, useState, createContext, useMemo} from 'react';
const ModalContext = createContext({});

export const ModalProvider = ({children}) => {
  const [visible, setVisibility] = useState(false);
  const hideActivityIndicator = () => {
    console.log('Hide');
    setVisibility(false);
  };
  const showActivityIndicator = () => {
    console.log('Hide');
    setVisibility(true);
  };
  const memoedValue = useMemo(
    () => ({
      showActivityIndicator,
      hideActivityIndicator,
    }),
    [showActivityIndicator, hideActivityIndicator],
  );
  return (
    <ModalContext.Provider value={memoedValue}>
      {children}
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        statusBarTranslucent={true}>
        <View style={styles.centeredView}>
          <View>
            <ActivityIndicator size="large" color={'red'} />
          </View>
        </View>
      </Modal>
    </ModalContext.Provider>
  );
};
export default function useModal() {
  return useContext(ModalContext);
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0008',
  },
  modalView: {
    margin: 20,

    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
