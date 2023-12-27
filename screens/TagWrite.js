import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

const TagWrite = () => {
  return (
    <View style={styles.container}>
      <Text>태그쓰기지롱</Text>
    </View>
  );
};

export default TagWrite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
  },
});
