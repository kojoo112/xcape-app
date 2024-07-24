import React from 'react';

import {Pressable, StyleSheet} from 'react-native';
import {Colors} from '../../Colors';
import Gradient from '../Gradient';
import GradientText from '../GradientText';

const NumberButton = ({number, onPress}) => {
  return (
    <Gradient colors={Colors.neonSlash} style={{padding: 1}}>
      <Pressable style={styles.container} onPress={() => onPress()}>
        <GradientText
          colors={Colors.neonSlash}
          textStyle={styles.number}
          text={number}
        />
      </Pressable>
    </Gradient>
  );
};

export default NumberButton;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.black,
  },
  number: {
    fontSize: 48,
    fontWeight: '700',
  },
});
