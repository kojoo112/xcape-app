import React, {useState} from 'react';

import {StyleSheet, ToastAndroid, View} from 'react-native';
import {Colors} from '../../../Colors';
import ToggleButton from '../../buttons/ToggleButton';
import PretendardText from '../../PretendardText';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {viewListState} from '../../../atoms';
import ConfirmButton from '../../buttons/ConfirmButton';
import CancelButton from '../../buttons/CancelButton';

const ButtonPadlock = props => {
  const answer = props.answer.split('').map(number => parseInt(number, 10));
  const navigation = useNavigation();
  const viewList = useRecoilValue(viewListState);

  const [input, setInput] = useState([]);

  const checkAnswer = () => {
    if (answer.length === input.length) {
      const isAnswer = input.every(item => answer.includes(item));
      if (isAnswer) {
        const viewListByTagId = viewList
          .filter(view => view.tagId === props.targetTagId)
          .sort((a, b) => a.orders - b.orders);
        navigation.push('TagView', {viewList: viewListByTagId});
      } else {
        ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
        setInput([]);
      }
    } else {
      ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
      setInput([]);
    }
  };

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
        <CancelButton onPress={() => setInput([])} />
        <ConfirmButton onPress={() => checkAnswer()} />
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
