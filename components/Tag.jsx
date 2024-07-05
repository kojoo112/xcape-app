import React from 'react';

import {Image, Pressable, StyleSheet, Text, ToastAndroid} from 'react-native';
import taggingLogo from '../assets/images/taging-logo.png';
import NfcManager, {Ndef, NfcTech} from 'react-native-nfc-manager';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {modalState, tagListState} from '../atoms';
import {useNavigation} from '@react-navigation/native';

const Tag = () => {
  const navigation = useNavigation();
  const tagList = useRecoilValue(tagListState);
  const setModalVisible = useSetRecoilState(modalState);

  async function readNdef() {
    try {
      setModalVisible({type: 'TAG', visible: true});
      await NfcManager.requestTechnology(NfcTech.Ndef);

      return await NfcManager.getTag();
    } catch (ex) {
      ToastAndroid.show('다시 시도해주세요.', ToastAndroid.SHORT);
    } finally {
      await NfcManager.cancelTechnologyRequest();
      setModalVisible({type: 'TAG', visible: false});
    }
  }

  return (
    <Pressable
      style={styles.tag}
      onPress={() => {
        readNdef().then(nfc => {
          if (nfc) {
            const payload = Ndef.text.decodePayload(nfc.ndefMessage[0].payload);
            const tagView = tagList.find(tag => tag.tagId === payload);
            if (tagView) {
              navigation.navigate('TagView', {viewList: tagView.viewList});
            }
          }
        });
        //   const find = tagList.find(
        //     tag => tag.tagId === '6c839d4a-1240-493b-a779-3c2b57ef8e21',
        //   );
        //   navigation.navigate('TagView', {
        //     viewList: find.viewList,
        //   });
      }}>
      <Image source={taggingLogo} style={styles.tagLogo} />
      <Text style={styles.tagText}>TAG</Text>
    </Pressable>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tag: {
    backgroundColor: '#212429',
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: 'white',
  },
  tagText: {
    fontSize: 50,
    fontWeight: '700',
    color: 'white',
  },
  tagLogo: {
    width: 50,
    height: 50,
  },
});
