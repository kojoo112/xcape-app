import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Hint from '../components/Hint';
import Timer from '../components/Timer';
import Tag from '../components/Tag';

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
              <Timer />
              {/* Tag 영역 */}
              <Tag />
            </View>
            {/* Hint Message 영역 */}
            <View style={styles.bottomContent}>
              <Hint />
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
});
