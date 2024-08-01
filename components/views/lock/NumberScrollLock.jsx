import React, {useState} from 'react';

import {StyleSheet, ToastAndroid, View} from 'react-native';
import GradientTextButton from '../../buttons/GradientTextButton';
import {Colors} from '../../../Colors';
import NumberScrollPicker from '../../NumberScrollPicker';
import ConfirmButton from '../../buttons/ConfirmButton';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {viewListState} from '../../../atoms';

const NumberScrollLock = props => {
  const answer = props.answer.split('');
  const navigation = useNavigation();
  const viewList = useRecoilValue(viewListState);

  const [input, setInput] = useState([]);

  const checkAnswer = () => {
    let flag = true;
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] !== input[i]) {
        flag = false;
        break;
      }
    }

    if (flag) {
      const viewListByTagId = viewList
        .filter(view => view.tagId === props.targetTagId)
        .sort((a, b) => a.orders - b.orders);
      navigation.push('TagView', {viewList: viewListByTagId});
    } else {
      ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
      setInput([]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.wheelContainer}>
        <NumberScrollPicker
          answerChar={answer[0]}
          index={0}
          setInput={setInput}
        />
        <NumberScrollPicker
          answerChar={answer[1]}
          index={1}
          setInput={setInput}
        />
        <NumberScrollPicker
          answerChar={answer[2]}
          index={2}
          setInput={setInput}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <ConfirmButton onPress={() => checkAnswer()} />
      </View>
    </View>
  );
};

export default NumberScrollLock;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    paddingVertical: 12,
  },
  wheelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
});
