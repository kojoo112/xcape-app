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
import {tagListState} from '../../atoms';

const PasswordTagView = props => {
  const tagList = useRecoilValue(tagListState);
  const [password, setPassword] = useState(null);
  const navigation = useNavigation();
  const passwordRef = useRef();

  const answer = props.answer.toUpperCase();

  const isAnswer = async () => {
    try {
      if (answer === password.toUpperCase()) {
        const find = tagList.find(tag => tag.tagId === props.moveToTag);
        navigation.push('TagView', {viewList: find.viewList});
      } else {
        ToastAndroid.show('잘못된 입력입니다.', ToastAndroid.SHORT);
        setPassword('');
        passwordRef.current.clear();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const placeholder = '*'.repeat(props.answer.length);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder={placeholder}
        maxLength={props.answer.length}
        autoCapitalize="characters"
        multiline={true}
        numberOfLines={1}
        blurOnSubmit={true}
        returnKeyType="search"
        ref={passwordRef}
      />
      <TouchableOpacity style={styles.button} onPress={isAnswer}>
        <Text style={styles.buttonText}>입 력</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordTagView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 80,
  },
  input: {
    width: '70%',
    backgroundColor: '#18191b',

    color: '#d3d3d3',
    fontSize: 30,
    padding: 10,
    textAlign: 'center',
    letterSpacing: 10,
  },
  button: {
    width: '30%',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
