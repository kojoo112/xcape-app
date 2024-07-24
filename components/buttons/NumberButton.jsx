import React from 'react';

import {Pressable, StyleSheet} from 'react-native';
import PretendardText from '../PretendardText';
import {Colors} from '../../Colors';
import Gradient from '../Gradient';

const NumberButton = ({number, action}) => {
  return (
    <Gradient colors={Colors.neonSlash} style={{padding: 1}}>
      <Pressable style={styles.container} onPress={() => action()}>
        <PretendardText style={styles.number}>{number}</PretendardText>
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
    color: Colors.neonGreen,
    fontSize: 48,
    fontWeight: '700',
  },
});
