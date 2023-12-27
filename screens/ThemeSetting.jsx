import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const ThemeSetting = () => {
  return (
    <View style={styles.container}>
      <Text>Settings지롱</Text>
    </View>
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
  },
});
