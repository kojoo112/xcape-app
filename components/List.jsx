import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Colors';

const List = ({list, onPress, displayName}) => {
  return (
    <View style={styles.container}>
      {list.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPress(item.id)}
            style={styles.button}>
            <Text style={styles.text}>{item[displayName]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 5,
    padding: 10,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
  },
  text: {
    color: Colors.black,
    fontSize: 24,
  },
});
