import {useRecoilValue} from 'recoil';
import {themeListState} from '../atoms';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Colors} from '../Colors';
import React from 'react';

const Select = ({navigation, route}) => {
  const themeList = useRecoilValue(themeListState);
  const items = themeList.filter(
    theme => theme.merchantId === route.params.selectedValue,
  );

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

export default Select;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginBottom: 5,
    padding: 10,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
  },
  text: {
    color: Colors.black,
    fontSize: 24,
  },
});
