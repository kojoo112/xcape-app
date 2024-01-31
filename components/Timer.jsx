import React, {useEffect, useState} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {currentThemeState} from '../atoms';

let interval = null;

const Timer = () => {
  const currentTheme = useRecoilValue(currentThemeState);
  const [remainTime, setRemainTime] = useState(null);

  useEffect(() => {
    const {isPlaying, endTime} = currentTheme;
    if (isPlaying) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        setRemainTime(endTime - currentTime);
      }, 10);
    } else {
    }
    return () => clearInterval(interval);
  }, [currentTheme]);

  function formatTimeString(time, showMsecs) {
    let status;
    if (time < 0) {
      time = Math.abs(time);
      status = 'increase';
    }
    let msecs = time % 1000;

    if (msecs < 10) {
      msecs = `00${msecs}`;
    } else if (msecs < 100) {
      msecs = `0${msecs}`;
    }

    let seconds = Math.floor(time / 1000);
    let minutes = Math.floor(time / 60000);
    let hours = Math.floor(time / 3600000);
    seconds = seconds - minutes * 60;
    // minutes = minutes - hours * 60;

    if (status === 'increase') {
      return `+ ${minutes < 10 ? 0 : ''}${minutes}:${
        seconds < 10 ? 0 : ''
      }${seconds}:${msecs}`;
    }

    return `${minutes < 10 ? 0 : ''}${minutes}:${
      seconds < 10 ? 0 : ''
    }${seconds}`;
    // :${msecs}`;
  }

  return (
    <View>
      <Text style={styles.text}>{formatTimeString(remainTime)} </Text>
    </View>
  );
};

export default Timer;

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 50,
    backgroundColor: 'red',
    marginHorizontal: 5,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    fontWeight: '600',
  },
});
