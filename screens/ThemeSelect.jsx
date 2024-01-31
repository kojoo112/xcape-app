import React from 'react';

import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {useRecoilValue} from 'recoil';
import {themeListState} from '../atoms';

const ThemeSelect = ({navigation, route}) => {
  const themeList = useRecoilValue(themeListState);
  const items = themeList.filter(
    theme => theme.merchantId === route.params.selectedValue,
  );

  console.log(items);

  return (
    <View style={styles.container}>
      {items &&
        items.map(item => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                navigation.push('TagSelect', {
                  selectedValue: item.id,
                });
              }}
              style={styles.button}>
              <Text style={styles.text}>{item.nameKo}</Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

export default ThemeSelect;

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
