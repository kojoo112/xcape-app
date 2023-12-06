import React from 'react';

import {Pressable, StyleSheet, Text, ToastAndroid} from 'react-native';

const Timer = () => {
  return (
    <Pressable
      style={styles.timer}
      onLongPress={() => {
        ToastAndroid.show('TODO Timer 초기화', ToastAndroid.SHORT);
      }}>
      <Text style={styles.timerText}>00:00:000</Text>
    </Pressable>
  );
};

export default Timer;

const styles = StyleSheet.create({
  timer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 50,
    color: '#FFF',
    fontWeight: '600',
  },
});
