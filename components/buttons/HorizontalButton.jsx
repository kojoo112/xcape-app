import React from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../Colors';
import Gradient from '../Gradient';
import GradientText from '../GradientText';

const HorizontalButton = ({text, onPress}) => {
  return (
    <Gradient colors={Colors.neonSlash} style={{padding: 2, borderRadius: 15}}>
      <TouchableOpacity style={styles.container} onPress={() => onPress()}>
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
    borderRadius: 13,
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: Colors.black,
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
  },
});
