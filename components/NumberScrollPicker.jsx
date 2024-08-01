import React, {useEffect, useRef} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import {Colors} from '../Colors';
import GradientText from './GradientText';

const BUTTON_HEIGHT = 120;

const NumberScrollPicker = React.memo(({setInput, index}) => {
  const numberArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const scrollRef = useRef(null);

  const getCenterPosition = offsetY => {
    const buttonIndex = Math.round(offsetY / BUTTON_HEIGHT);
    return buttonIndex * BUTTON_HEIGHT;
  };

  const handleMinuteOnScroll = e => {
    const correctOffset = getCenterPosition(e.nativeEvent.contentOffset.y);
    scrollRef.current.scrollTo({y: correctOffset});

    setInput(prev => [
      ...prev.map((input, arrayIndex) =>
        arrayIndex === index
          ? numberArray[correctOffset / BUTTON_HEIGHT]
          : input,
      ),
    ]);
  };

  useEffect(() => {
    setInput(prev => [...prev, (prev[index] = numberArray[0])]);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        onScrollEndDrag={handleMinuteOnScroll}
        scrollEventThrottle={0}
        nestedScrollEnabled={true}
        decelerationRate={'fast'}
        style={{
          height: BUTTON_HEIGHT,
        }}>
        {numberArray.map(alphabet => (
          <View key={Math.random()} style={styles.itemContainerStyle}>
            <GradientText
              colors={Colors.neonSlash}
              textStyle={styles.textStyle}
              text={alphabet}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

export default NumberScrollPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  itemContainerStyle: {
    height: BUTTON_HEIGHT,
    backgroundColor: Colors.darker,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  textStyle: {
    fontSize: 50,
    fontWeight: '700',
  },
});
