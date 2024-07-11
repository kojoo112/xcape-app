import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Colors';
import PretendardText from './PretendardText';

const List = ({list, onPress, displayName}) => {
  return (
    <View style={styles.container}>
      {list.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPress(item.id)}
            style={styles.button}>
            <PretendardText style={styles.text}>
              {item[displayName]}
            </PretendardText>
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
    gap: 20,
  },
  button: {
    marginBottom: 5,
    paddingVertical: 16,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neonYellow,
    borderRadius: 10,
  },
  text: {
    color: Colors.black,
    fontSize: 24,
    fontWeight: '700',
  },
});
