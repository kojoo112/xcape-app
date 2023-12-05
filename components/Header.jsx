import React from 'react';

import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.themeName}>Theme name</Text>
      </View>
      <Pressable
        style={styles.hintCountContainer}
        onLongPress={() => {
          ToastAndroid.show('TODO 힌트카운트 초기화', ToastAndroid.SHORT);
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.hintCountText}>Hint Count</Text>
          <Text style={styles.hintCountNumber}>0</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#212429',
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  themeName: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
  hintCountContainer: {
    position: 'absolute',
    right: 0,
    paddingHorizontal: 8,
  },
  hintCountText: {
    color: 'white',
  },
  hintCountNumber: {
    color: 'white',
    fontSize: 26,
  },
});
