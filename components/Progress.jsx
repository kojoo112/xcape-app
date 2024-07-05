import React from 'react';

import {Image, StyleSheet, View} from 'react-native';
import {Colors} from '../Colors';

const Progress = ({children}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        tintColor={Colors.logo}
        source={require('../assets/images/progress-logo.png')}
      />
      {children}
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    position: 'absolute',
    width: 60,
    height: 60,
  },
});
