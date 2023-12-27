import React from 'react';

import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
const searchIcon = require('../assets/images/search.png');

const Header = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable
        onLongPress={() => {
          navigation.navigate('Settings');
        }}>
        <Text style={styles.themeName}>기억의 틈</Text>
      </Pressable>
      <Text style={styles.time}>50:00</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={styles.hintCountNumber}>0</Text>
        <Image
          source={searchIcon}
          style={{marginLeft: 10, width: 24, height: 24}}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212429',
    paddingHorizontal: 20,
    paddingVertical: 30,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeName: {
    fontSize: 24,
    color: 'white',
    fontWeight: '600',
  },
  time: {
    fontSize: 32,
    color: 'white',
    fontWeight: '600',
  },
  hintCountNumber: {
    color: 'white',
    fontSize: 26,
  },
});
