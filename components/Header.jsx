import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Timer from './Timer';
import {Colors} from '../Colors';

const Header = () => {
  return (
    <View style={styles.container}>
      <Timer />
      <View style={styles.hintCountContainer}>
        <Text style={styles.hintCountNumber}>0</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hintCountContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    right: 40,
  },
  hintCountNumber: {
    color: Colors.primary,
    fontSize: 48,
  },
});
