import axios from 'axios';
import {setItem} from './storage';

export const syncInitialData = async (
  setMerchantList,
  setThemeList,
  setHintList,
  setTagList,
  setViewList,
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
      return axios.get(
        'https://xcape-business-sdk-uploads-dev.s3.ap-northeast-2.amazonaws.com/json/hint/release.json',
      );
    })
    .then(res => {
      setHintList(res.data);
      return setItem('hintList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(
        'https://xcape-business-sdk-uploads-dev.s3.ap-northeast-2.amazonaws.com/json/tag/release.json',
      );
    })
    .then(res => {
      setTagList(res.data);
      return setItem('tagList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(
        'https://xcape-business-sdk-uploads-dev.s3.ap-northeast-2.amazonaws.com/json/view/release.json',
      );
    })
    .then(res => {
      setViewList(res.data);
      return setItem('viewList', JSON.stringify(res.data));
    });
};
