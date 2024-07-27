import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../Colors';
import Gradient from '../Gradient';
import GradientText from '../GradientText';

const HorizontalButton = ({text, onPress, size = 'large'}) => {
  return (
    <Gradient
      colors={Colors.neonSlash}
      style={{padding: 2, borderRadius: size === 'large' ? 15 : 10}}>
      <TouchableOpacity
        style={{
          ...styles.container,
          paddingHorizontal: size === 'large' ? 48 : 16,
          borderRadius: size === 'large' ? 13 : 8,
        }}
        onPress={() => onPress()}>
        <GradientText
          colors={Colors.neonSlash}
          textStyle={styles.text}
          text={text}
        />
      </TouchableOpacity>
    </Gradient>
  );
};

export default HorizontalButton;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: Colors.black,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
  },
});
