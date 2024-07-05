import React from 'react';

import {Modal, View} from 'react-native';

const ModalComponent = ({modalVisible, children}) => {
  return (
    <View>
      <Modal animationType={'fade'} transparent={true} visible={modalVisible}>
        {children}
      </Modal>
    </View>
  );
};

export default ModalComponent;
