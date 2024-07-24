import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../Colors';
import GradientText from '../GradientText';

const ActionButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress()}>
      <GradientText
        colors={Colors.neonSlash}
        textStyle={styles.text}
        text={text}
      />
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
    fontWeight: '700',
  },
});
