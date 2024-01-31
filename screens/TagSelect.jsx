import React, {useState} from 'react';

import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {tagListState} from '../atoms';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';

const TagSelect = ({route}) => {
  const tagList = useRecoilValue(tagListState);
  const items = Object.values(tagList)
    .filter(page => page.themeId === route.params.selectedValue)
    .sort((a, b) => a.pageName.localeCompare(b.pageName));

  const [selectedTag, setSelectedTag] = useState();

  const writeTag = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const bytes = Ndef.encodeMessage([
        Ndef.textRecord(selectedTag),
        // Ndef.androidApplicationRecord('com.xcape.app'),
      ]);
      console.log('writeTag', selectedTag);
      if (bytes) {
        await NfcManager.ndefHandler.writeNdefMessage(
          Ndef.encodeMessage([Ndef.textRecord(selectedTag)]),
        );
      }
    } catch (ex) {
      console.log('NfcRead >>> writeTag >>> : ', ex);
      ToastAndroid.show('다시 시도해주세요.', ToastAndroid.SHORT);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {items &&
          items.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  setSelectedTag(item.id);
                  console.log(item.id);
                }}
                style={styles.button}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.text}>{item.pageName}</Text>
                  {selectedTag === item.id ? (
                    <Ionicons name="checkmark-outline"></Ionicons>
                  ) : (
                    <></>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      <View style={{marginTop: 10, marginBottom: 20}}>
        <Button
          title={'태그 쓰기'}
          onPress={() => {
            console.log('asdfasdf');
            writeTag();
          }}></Button>
      </View>
    </View>
  );
};

export default TagSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#212429',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
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
