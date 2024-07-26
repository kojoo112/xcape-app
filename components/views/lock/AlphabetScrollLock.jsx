import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {Colors} from '../../../Colors';
import HorizontalButton from '../../buttons/HorizontalButton';
import AlphabetScrollPicker from '../../AlphabetScrollPicker';

const AlphabetScrollLock = () => {
  const answer = 'HINT'.split('');

  const [input, setInput] = useState([]);

  const checkAnswer = () => {
    let flag = true;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] !== input[i]) {
        flag = false;
        break;
      }
    }

    console.log(answer);
    console.log(input);
    console.log(flag);
    // TODO checkAnswer
    if (flag) {
      // 정답일 경우
    } else {
      // 오답일 경우
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        <AlphabetScrollPicker
          answerChar={answer[0]}
          index={0}
          setInput={setInput}
        />
        <AlphabetScrollPicker
          answerChar={answer[1]}
          index={1}
          setInput={setInput}
        />
        <AlphabetScrollPicker
          answerChar={answer[2]}
          index={2}
          setInput={setInput}
        />
        <AlphabetScrollPicker
          answerChar={answer[3]}
          index={3}
          setInput={setInput}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <HorizontalButton
          text={'입력'}
          onPress={() => {
            checkAnswer();
          }}
        />
      </View>
    </View>
  );
};

export default AlphabetScrollLock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
  },
  wheelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
});
