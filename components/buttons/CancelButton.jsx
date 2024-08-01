import React from 'react';

import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../Colors';

const CancelButton = ({onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={require('../../assets/images/reload.png')}
        style={{width: 40, height: 40}}
      />
    </TouchableOpacity>
  );
};

export default CancelButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 48,
    backgroundColor: Colors.black,
  },
});
