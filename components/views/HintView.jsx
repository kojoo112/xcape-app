import React, {useState} from 'react';

import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import {Colors} from '../../Colors';
import Gradient from '../Gradient';

const neonSlash = [Colors.neonYellow, Colors.neonGreen];

const HintView = ({message1, message2}) => {
  const [messageVisible, setMessageVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Gradient colors={neonSlash} style={styles.headerBorder}>
          <View style={styles.textContainer}>
            <Text style={styles.hintText}>HINT</Text>
          </View>
        </Gradient>
      </View>
      <Gradient
        colors={neonSlash}
        style={{
          ...styles.gradientStyle,
          paddingBottom: 0,
          marginVertical: 16,
        }}>
        <View style={styles.subMessageContainer}>
          <Text style={styles.hintMessage}>{message1}</Text>
        </View>
      </Gradient>
      <Gradient
        colors={neonSlash}
        style={{...styles.gradientStyle, marginBottom: 4}}>
        <View style={styles.subMessageContainer}>
          {!messageVisible ? (
            <Pressable
              onPress={() => setMessageVisible(true)}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../assets/images/locker.png')}
                style={{marginVertical: 8}}
              />
              <Text style={{...styles.hintMessage, color: Colors.neonYellow}}>
                터치하면 정답이 보입니다.
              </Text>
            </Pressable>
          ) : (
            <Text style={styles.hintMessage}>{message2}</Text>
          )}
        </View>
      </Gradient>
    </View>
  );
};

export default HintView;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.black,
  },
  header: {
    paddingHorizontal: 42,
  },
  headerBorder: {
    padding: 2,
    borderRadius: 100,
  },
  textContainer: {
    backgroundColor: Colors.black,
    width: '100%',
    borderRadius: 100,
    alignItems: 'center',
    paddingVertical: 16,
  },
  hintText: {
    color: '#FFF100',
    fontSize: 36,
    fontWeight: '700',
  },
  gradientStyle: {
    padding: 2,
  },
  subMessageContainer: {
    backgroundColor: Colors.black,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  hintMessage: {
    fontSize: 24,
    color: Colors.white,
  },
});
