import React from 'react';

import {ScrollView} from 'react-native';
import {useRecoilValue} from 'recoil';
import {tagListState} from '../atoms';
import {useTagModal} from '../context/TagModalContext';
import {writeTag} from '../plugins/nfc';
import List from '../components/List';
import {Colors} from '../Colors';
const TagSelect = ({route}) => {
  const tagList = useRecoilValue(tagListState);
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

  return (
    <ScrollView style={{backgroundColor: Colors.black, paddingVertical: 12}}>
      <List
        list={tagListByThemeId}
        displayName={'name'}
        onPress={value => {
          writeTagId(value);
        }}
      />
    </ScrollView>
  );
};

export default TagSelect;
