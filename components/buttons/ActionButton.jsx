import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../Colors';
import PretendardText from '../PretendardText';

const ActionButton = ({text, action}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => action()}>
      <PretendardText style={styles.text}>{text}</PretendardText>
    </TouchableOpacity>
  );
};

export default ActionButton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.midnight,
  },
  text: {
    fontSize: 24,
    color: Colors.neonGreen,
    fontWeight: '700',
  },
});
