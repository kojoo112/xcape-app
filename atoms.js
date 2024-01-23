import {atom} from 'recoil';

export const modalState = atom({
  key: 'modalVisible',
  default: false,
});

export const hintListState = atom({
  key: 'hintList',
  default: [],
});

export const tagListState = atom({
  key: 'tagList',
  default: [],
});

export const merchantListState = atom({
  key: 'merchantList',
  default: [],
});

export const themeListState = atom({
  key: 'themeList',
  default: [],
});

export const currentThemeState = atom({
  key: 'currentTheme',
  default: {
    id: 0,
    merchantId: 0,
    nameKo: '',
    runningTime: 0,
  },
});
