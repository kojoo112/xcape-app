import React, {useEffect, useState} from 'react';

import {Pressable, StyleSheet} from 'react-native';
import Gradient from '../Gradient';
import {Colors} from '../../Colors';

const ToggleButton = ({value, input, setInput}) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (input.some(num => num === value)) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [input]);

  const onPress = () => {
    if (active) {
      setInput(prev => [...prev.filter(num => num !== value)]);
    } else {
      setInput(prev => [...prev, value]);
    }
  };

  return (
    <Gradient colors={Colors.neonSlash} style={{padding: 2}}>
      <Pressable
        style={{
          ...styles.button,
          backgroundColor: active ? Colors.logo : Colors.darker,
        }}
        onPress={onPress}></Pressable>
    </Gradient>
  );
};

export default ToggleButton;

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 100,
  },
});
