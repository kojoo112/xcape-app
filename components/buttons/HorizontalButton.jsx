import React from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../Colors';

const HorizontalButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={() => onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default HorizontalButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: Colors.neonYellow,
  },
});
