import {
  Image,
  StyleSheet,
  View,
  Text,
  Pressable,
  ToastAndroid,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const taggingLogo = require('../assets/images/taging-logo.png');
const window = Dimensions.get('window');

export default function Home() {
  return (
    <KeyboardAwareScrollView
      extraHeight={300}
      enableOnAndroid={true}
      enableAutomaticScroll={Platform.OS === 'ios'}
      contentContainerStyle={{height: -30}}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={true}>
      <SafeAreaView style={{height: window.height}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Header />
            <View style={styles.topContent}>
              {/* Timer 영역 */}
              <Pressable
                style={styles.timer}
                onLongPress={() => {
                  ToastAndroid.show('TODO Timer 초기화', ToastAndroid.SHORT);
                }}>
                <Text style={styles.timerText}>00:00:000</Text>
              </Pressable>
              {/* Tag 영역 */}
              <Pressable
                style={styles.tag}
                onPress={() => {
                  ToastAndroid.show('TODO NFC Tag', ToastAndroid.SHORT);
                }}>
                <Text style={styles.tagText}>TAG</Text>
                <Image source={taggingLogo} style={styles.tagLogo} />
                <Text style={styles.tagText}>GING</Text>
              </Pressable>
            </View>
            {/* Hint Message 영역 */}
            <View style={styles.bottomContent}>
              <View style={styles.hintBox}>
                <Text>Sub Hint</Text>
              </View>
              <Pressable
                style={styles.hintBox}
                onPress={() => {
                  ToastAndroid.show('TODO confirm()', ToastAndroid.SHORT);
                }}>
                <View>
                  <Text>Masked Hint</Text>
                </View>
              </Pressable>
              <View style={styles.search}>
                <TextInput style={styles.searchInput} />
                <Pressable
                  style={styles.searchButton}
                  onPress={() => {
                    ToastAndroid.show('TODO 힌트 검색', ToastAndroid.SHORT);
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
  },
  topContent: {
    flex: 0.3,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  bottomContent: {
    flex: 0.7,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  timer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 50,
    color: '#FFF',
    fontWeight: '600',
  },
  tag: {
    flex: 0.5,
    backgroundColor: '#212429',
    paddingHorizontal: 20,
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
});
