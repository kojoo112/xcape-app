import {atom} from 'recoil';

export const tagListState = atom({
  key: 'tagList',
  default: 0,
});

export const modalState = atom({
  key: 'modalVisible',
  default: false,
});
