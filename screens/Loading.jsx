import React from 'react';

import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';

const Loading = () => {
  const {width, height} = Dimensions.get('window');

  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0,0.8)',
        width: width,
        height: height,
        zIndex: 100,
      }}>
      <ActivityIndicator style={{top: height / 3}} size={100} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
