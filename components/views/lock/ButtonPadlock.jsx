import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';
import {Colors} from '../../../Colors';
import ToggleButton from '../../buttons/ToggleButton';
import HorizontalButton from '../../buttons/HorizontalButton';
import PretendardText from '../../PretendardText';

const ButtonPadlock = props => {
  // TODO checkAnswer
  // const answerArr = props.answer.split('');
  const [input, setInput] = useState([]);

  const checkAnswer = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <PretendardText style={styles.text}>1</PretendardText>
        <ToggleButton value={1} input={input} setInput={setInput} />
        <ToggleButton value={5} input={input} setInput={setInput} />
        <PretendardText style={styles.text}>5</PretendardText>
      </View>
      <View style={styles.row}>
        <PretendardText style={styles.text}>2</PretendardText>
        <ToggleButton value={2} input={input} setInput={setInput} />
        <ToggleButton value={6} input={input} setInput={setInput} />
        <PretendardText style={styles.text}>6</PretendardText>
      </View>
      <View style={styles.row}>
        <PretendardText style={styles.text}>3</PretendardText>
        <ToggleButton value={3} input={input} setInput={setInput} />
        <ToggleButton value={7} input={input} setInput={setInput} />
        <PretendardText style={styles.text}>7</PretendardText>
      </View>
      <View style={styles.row}>
        <PretendardText style={styles.text}>4</PretendardText>
        <ToggleButton value={4} input={input} setInput={setInput} />
        <ToggleButton value={8} input={input} setInput={setInput} />
        <PretendardText style={styles.text}>8</PretendardText>
      </View>
      <View style={{...styles.row, marginVertical: 12}}>
        <HorizontalButton text={'취소'} onPress={() => setInput([])} />
        <HorizontalButton text={'입력'} onPress={() => checkAnswer()} />
      </View>
    </View>
  );
};

export default ButtonPadlock;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: Colors.black,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 24,
  },
  text: {
    fontSize: 32,
    color: Colors.white,
    fontWeight: '700',
  },
});
