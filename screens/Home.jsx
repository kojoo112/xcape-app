import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import Tag from '../components/Tag';

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Tag />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
