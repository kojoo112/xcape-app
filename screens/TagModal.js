import React from 'react';

import {Dimensions, Image, Modal, StyleSheet, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {modalState} from '../atoms';
import NfcManager from 'react-native-nfc-manager';

const TagModal = () => {
  const [modalVisible, setModalVisible] = useRecoilState(modalState);
  return (
    <Modal
      animationType="none"
      visible={modalVisible}
      onRequestClose={() => {
        NfcManager.cancelTechnologyRequest().then(() => {
          setModalVisible(false);
        });
      }}
      transparent={true}>
      <View style={styles.container}>
        <View style={styles.tagContainer}>
          <Image
            source={require('../assets/images/xcape-logo.png')}
            style={{width: 120}}
            resizeMode="contain"
          />
        </View>
      </View>
    </Modal>
  );
};

export default TagModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
  },
  tagContainer: {
    flex: 0.3,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#1B1B18',
    borderBottomLeftRadius: Dimensions.get('window').width / 2,
    borderBottomRightRadius: Dimensions.get('window').width / 2,
    borderColor: 'white',
    borderWidth: 1,
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
