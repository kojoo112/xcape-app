import React, {useState} from 'react';

import {StyleSheet, ToastAndroid, View} from 'react-native';
import {Colors} from '../../../Colors';
import AlphabetScrollPicker from '../../AlphabetScrollPicker';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {viewListState} from '../../../atoms';
import ConfirmButton from '../../buttons/ConfirmButton';

const AlphabetScrollLock = props => {
  const answer = props.answer.toUpperCase().split('');
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
        <ConfirmButton onPress={() => checkAnswer()} />
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
