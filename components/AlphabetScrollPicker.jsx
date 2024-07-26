import React, {useCallback, useEffect, useRef} from 'react';

import {ScrollView, StyleSheet, View} from 'react-native';
import Gradient from './Gradient';
import {Colors} from '../Colors';
import GradientText from './GradientText';

const BUTTON_HEIGHT = 100;

const AlphabetScrollPicker = React.memo(({answerChar, setInput, index}) => {
  const shuffle = useCallback(array => {
    array.sort(() => Math.random() - 0.5);
  }, []);

  const createRandomAlphabetWithChar = useCallback(() => {
    const characters = [...Array(26)].map((val, i) =>
      String.fromCharCode(i + 65),
    );
    const alphabetArray = [answerChar];

    while (alphabetArray.length < 10) {
      const randomAlphabet =
        characters[Math.floor(Math.random() * characters.length)];
      if (answerChar !== randomAlphabet) {
        alphabetArray.push(randomAlphabet);
      }
    }

    shuffle(alphabetArray);
    return alphabetArray;
  }, []);

  const alphabetArray = createRandomAlphabetWithChar();

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
        arrayIndex === index ? alphabetArray[correctOffset / 100] : input,
      ),
    ]);
  };

  useEffect(() => {
    setInput(prev => [...prev, (prev[index] = alphabetArray[0])]);
  }, []);

  return (
    <View style={styles.container}>
      <Gradient colors={Colors.neonSlash} style={{padding: 2}}>
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          onScrollEndDrag={handleMinuteOnScroll}
          scrollEventThrottle={0}
          decelerationRate={'fast'}
          style={{
            height: BUTTON_HEIGHT,
          }}>
          {alphabetArray.map(alphabet => (
            <View key={Math.random()} style={styles.itemContainerStyle}>
              <GradientText
                colors={Colors.neonSlash}
                textStyle={styles.textStyle}
                text={alphabet}
              />
            </View>
          ))}
        </ScrollView>
      </Gradient>
    </View>
  );
});

export default AlphabetScrollPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  itemContainerStyle: {
    height: BUTTON_HEIGHT,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textStyle: {
    fontSize: 50,
    fontWeight: '700',
  },
});
