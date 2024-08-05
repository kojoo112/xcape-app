import React from 'react';

import {StyleSheet, ScrollView, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {tagListState, viewListState} from '../atoms';
import {useTagModal} from '../context/TagModalContext';
import {writeTag} from '../plugins/nfc';
import List from '../components/List';
import {Colors} from '../Colors';
import PretendardText from '../components/PretendardText';
import {useNavigation} from '@react-navigation/native';
const TagSelect = ({route}) => {
  const tagList = useRecoilValue(tagListState);
  const viewList = useRecoilValue(viewListState);
  const navigation = useNavigation();

  const tagListByThemeId = tagList
    .filter(tag => tag.themeId === route.params.themeId)
    .sort((a, b) => a.name.localeCompare(b.name));

  const {openTagModal, closeTagModal} = useTagModal();

  const writeTagId = tagId => {
    openTagModal();
    writeTag(tagId).then(() => {
      closeTagModal();
    });
  };

  const tagPreview = tagId => {
    const viewListByTagId = viewList
      .filter(view => view.tagId === tagId)
      .sort((a, b) => a.orders - b.orders);
    navigation.push('TagPreview', {viewList: viewListByTagId});
  };

  return (
    <View style={styles.container}>
      {tagListByThemeId.length > 0 ? (
        <ScrollView>
          <View style={{paddingVertical: 20, backgroundColor: Colors.black}}>
            <List
              list={tagListByThemeId}
              displayName={'name'}
              onPress={value => {
                writeTagId(value);
              }}
              previewVisible={true}
              previewOnPress={value => tagPreview(value)}
            />
          </View>
        </ScrollView>
      ) : (
        <PretendardText style={styles.noTag}>태그가 없습니다.</PretendardText>
      )}
    </View>
  );
};

export default TagSelect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noTag: {
    color: Colors.primary,
    fontSize: 32,
  },
});
