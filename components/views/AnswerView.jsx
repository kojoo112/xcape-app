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

const AnswerView = props => {
  const viewList = useRecoilValue(viewListState);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const passwordRef = useRef();

  const answer = props.answer.toUpperCase();

  const checkAnswer = () => {
    if (answer === password.toUpperCase()) {
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
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder={placeholder}
        placeholderTextColor={Colors.white}
        maxLength={props.answer.length}
        autoCapitalize="characters"
        multiline={true}
        numberOfLines={1}
        blurOnSubmit={true}
        returnKeyType="search"
        ref={passwordRef}
      />
      <TouchableOpacity style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>입 력</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AnswerView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
  },
  input: {
    width: '70%',
    backgroundColor: Colors.logo,
    color: Colors.white,
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    letterSpacing: 10,
  },
  button: {
    width: '30%',
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
