import {SafeAreaView, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import Tag from '../components/Tag';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {
  currentThemeState,
  hintListState,
  merchantListState,
  tagListState,
  themeListState,
} from '../atoms';
import TagModal from './TagModal';
import {syncInitialData} from '../api/api';
import {hasInitialData, getItem} from '../storage/storage';

export default function Home() {
  const currentTheme = useRecoilValue(currentThemeState);
  const setCurrentTheme = useSetRecoilState(currentThemeState);
  const setMerchantList = useSetRecoilState(merchantListState);
  const setThemeList = useSetRecoilState(themeListState);
  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);

  useEffect(() => {
    hasInitialData().then(flag => {
      if (!flag) {
        syncInitialData(setMerchantList, setThemeList, setHintList, setTagList);
      } else {
        getItem('merchantList').then(res => setMerchantList(JSON.parse(res)));
        getItem('themeList').then(res => setThemeList(JSON.parse(res)));
        getItem('hintList').then(res => setHintList(JSON.parse(res)));
        getItem('tagList').then(res => setTagList(JSON.parse(res)));
        getItem('currentTheme').then(res => setCurrentTheme(JSON.parse(res)));
      }
    });
    setTagList(require('../tagList.json'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TagModal />
      <Tag />
      <TouchableOpacity
        style={{
          width: 200,
          paddingHorizontal: 20,
          backgroundColor: '#0095F6',
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}
        onPress={() => {
          console.log(currentTheme);
        }}>
        <Text style={{color: 'white'}}>현재 테마 확인</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
