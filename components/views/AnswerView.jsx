import {
  Text,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {viewListState} from '../../atoms';
import {Colors} from '../../Colors';
import HorizontalButton from '../buttons/HorizontalButton';

const AnswerView = props => {
  const viewList = useRecoilValue(viewListState);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const passwordRef = useRef();

  const answer = props.answer.toUpperCase();

  const checkAnswer = () => {
    if ('answer' === password.toUpperCase()) {
      const viewListByTagId = viewList
        .filter(view => view.tagId === props.targetTagId)
        .sort((a, b) => a.orders - b.orders);
      navigation.push('TagView', {viewList: viewListByTagId});
    } else {
      ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
      setPassword('');
      passwordRef.current.clear();
    }
  };

  const placeholder = '*'.repeat(props.answer.length);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          placeholderTextColor={Colors.white}
          maxLength={props.answer.length}
          placeholder={placeholder}
          autoCapitalize={'characters'}
          multiline={true}
          numberOfLines={1}
          blurOnSubmit={true}
          returnKeyType={'search'}
          ref={passwordRef}
        />
      </View>
      <View style={styles.buttonContainer}>
        <HorizontalButton
          text={'취소'}
          onPress={() => passwordRef.current.clear()}
          size={'small'}
        />
        <HorizontalButton text={'제출'} onPress={checkAnswer} size={'small'} />
      </View>
    </View>
  );
};

export default AnswerView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.black,
    paddingVertical: 10,
  },
  inputContainer: {
    width: '60%',
    paddingHorizontal: 4,
  },
  input: {
    backgroundColor: Colors.white,
    color: Colors.black,
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    letterSpacing: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
  },
});
