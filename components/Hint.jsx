import React from 'react';

import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import search from '../assets/images/search.png';

const Hint = () => {
  return (
    <View style={styles.container}>
      <View style={styles.hintBox}>
        <Text>Sub Hint</Text>
      </View>
      <Pressable
        style={styles.hintBox}
        onPress={() => {
          ToastAndroid.show('TODO confirm()', ToastAndroid.SHORT);
        }}>
        <View>
          <Text>Main Hint</Text>
        </View>
      </Pressable>
      <View style={styles.search}>
        <TextInput style={styles.searchInput} />
        <Pressable
          style={styles.searchButton}
          onPress={() => {
            ToastAndroid.show('TODO 힌트 검색', ToastAndroid.SHORT);
          }}>
          <Image source={search} style={styles.searchIcon} />
        </Pressable>
      </View>
    </View>
  );
};

export default Hint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  hintBox: {
    flex: 0.45,
    marginBottom: 5,
    backgroundColor: '#212429',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'white',
    padding: 10,
    justifyContent: 'center',
  },
  search: {
    flex: 0.1,
    backgroundColor: 'blue',
    flexDirection: 'row',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#6c757e',
    flex: 1,
    borderWidth: 1.5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: 'white',
    color: 'white',
    padding: 10,
  },
  searchButton: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333a44',
    borderWidth: 1.5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
});
