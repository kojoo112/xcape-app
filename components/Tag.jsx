import React from 'react';

import {Pressable, StyleSheet, ToastAndroid, Text, Image} from 'react-native';
import taggingLogo from '../assets/images/taging-logo.png';

const Tag = () => {
  return (
    <Pressable
      style={styles.tag}
      onPress={() => {
        ToastAndroid.show('TODO NFC Tag', ToastAndroid.SHORT);
      }}>
      <Image source={taggingLogo} style={styles.tagLogo} />
      <Text style={styles.tagText}>TAG</Text>
    </Pressable>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#212429',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
  },
  tagText: {
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
  },
  tagLogo: {
    width: 50,
    height: 50,
  },
});
