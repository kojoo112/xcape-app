import React, {useState} from 'react';

import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {Colors} from '../../../Colors';
import NumberButton from '../../buttons/NumberButton';
import ActionButton from '../../buttons/ActionButton';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {viewListState} from '../../../atoms';

const KeypadLock = props => {
  const answer = props.answer;
  const navigation = useNavigation();
  const viewList = useRecoilValue(viewListState);

  const [input, setInput] = useState('');

  const onNumberPress = number => {
    if (input.length === 8) {
      return;
    }
    setInput(prev => prev + number.toString());
  };

  const onCancel = () => {
    setInput('');
  };

  const checkAnswer = () => {
    if (input === answer.toString()) {
      const viewListByTagId = viewList
        .filter(view => view.tagId === props.targetTagId)
        .sort((a, b) => a.orders - b.orders);
      navigation.push('TagView', {viewList: viewListByTagId});
    } else {
      ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
      setInput('');
    }
  };

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 30}}>
        <Text style={styles.input}>{input}</Text>
      </View>
      <View style={styles.row}>
        <NumberButton number={1} onPress={() => onNumberPress(1)} />
        <NumberButton number={2} onPress={() => onNumberPress(2)} />
        <NumberButton number={3} onPress={() => onNumberPress(3)} />
      </View>
      <View style={styles.row}>
        <NumberButton number={4} onPress={() => onNumberPress(4)} />
        <NumberButton number={5} onPress={() => onNumberPress(5)} />
        <NumberButton number={6} onPress={() => onNumberPress(6)} />
      </View>
      <View style={styles.row}>
        <NumberButton number={7} onPress={() => onNumberPress(7)} />
        <NumberButton number={8} onPress={() => onNumberPress(8)} />
        <NumberButton number={9} onPress={() => onNumberPress(9)} />
      </View>
      <View style={styles.row}>
        <NumberButton number={0} onPress={() => onNumberPress(0)} />
        <ActionButton text={'취소'} onPress={() => onCancel()} />
        <ActionButton text={'입력'} onPress={() => checkAnswer()} />
      </View>
    </View>
  );
};

export default KeypadLock;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: Colors.black,
  },
  input: {
    color: Colors.white,
    fontSize: 32,
    textAlign: 'center',
    letterSpacing: 24,
    paddingVertical: 24,
    fontWeight: '700',
    backgroundColor: Colors.midnight,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});
