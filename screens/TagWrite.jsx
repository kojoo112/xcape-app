import React, {useCallback} from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {merchantListState} from '../atoms';

const TagWrite = ({navigation}) => {
  const merchantList = useRecoilValue(merchantListState);

  return (
    <View style={styles.container}>
      {merchantList &&
        merchantList.map(merchant => {
          return (
            <TouchableOpacity
              key={merchant.id}
              onPress={() => {
                navigation.push('ThemeSelect', {selectedValue: merchant.id});
              }}
              style={styles.button}>
              <Text style={styles.text}>{merchant.name}</Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default TagWrite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212429',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 5,
    padding: 10,
    width: 240,
    justifyContent: 'center',
    backgroundColor: '#424753',
    borderRadius: 5,
  },
  text: {
    fontSize: 18,
  },
});
