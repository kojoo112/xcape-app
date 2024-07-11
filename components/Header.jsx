import React from 'react';

import {StyleSheet, Text, View} from 'react-native';
import Timer from './Timer';
import {Colors} from '../Colors';
import {useRecoilValue} from 'recoil';
import {currentThemeState} from '../atoms';

const Header = () => {
  const currentTheme = useRecoilValue(currentThemeState);

  return (
    <View style={styles.container}>
      <Timer />
      <View style={styles.hintCountContainer}>
        <Text
          style={
            currentTheme.hintCount === 0
              ? styles.zeroCount
              : styles.positiveCount
          }>
          {currentTheme.hintCount}
        </Text>
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
    right: 30,
  },
  zeroCount: {
    color: Colors.darker,
    fontSize: 48,
    fontWeight: '700',
  },
  positiveCount: {
    color: Colors.primary,
    fontSize: 48,
    fontWeight: '700',
  },
});
