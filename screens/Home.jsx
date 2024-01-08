import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import Tag from '../components/Tag';
import {useSetRecoilState} from 'recoil';
import {tagListState} from '../atoms';
import TagModal from './TagModal';

export default function Home() {
  const setTagList = useSetRecoilState(tagListState);

  useEffect(() => {
    setTagList(require('../tagList.json'));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TagModal />
      <Tag />
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
