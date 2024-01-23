import axios from 'axios';
import {setItem} from '../storage/storage';
import {getValue} from './firebase';

export const syncInitialData = async (
  setMerchantList,
  setThemeList,
  setHintList,
  setTagList,
) => {
  await axios
    .get(
      'https://xcape-business-sdk-uploads.s3.ap-northeast-2.amazonaws.com/json/merchant/release.json',
    )
    .then(res => {
      setMerchantList(res.data);
      return setItem('merchantList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(
        'https://xcape-business-sdk-uploads.s3.ap-northeast-2.amazonaws.com/json/theme/release.json',
      );
    })
    .then(res => {
      setThemeList(res.data);
      return setItem('themeList', JSON.stringify(res.data));
    })
    .then(() => {
      return getValue('newHintList');
    })
    .then(hintList => {
      setHintList(hintList);
      return setItem('hintList', JSON.stringify(hintList));
    })
    .then(() => {
      return getValue('newTagList');
    })
    .then(tagList => {
      setTagList(tagList);
      return setItem('tagList', JSON.stringify(tagList));
    });
};
