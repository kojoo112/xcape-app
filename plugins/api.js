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
      {
        headers: {
          'Cache-Control': 'no-store',
        },
      },
    )
    .then(res => {
      setMerchantList([...res.data]);
      return setItem('merchantList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(
        'https://xcape-business-sdk-uploads.s3.ap-northeast-2.amazonaws.com/json/theme/release.json',
        {
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    })
    .then(res => {
      setThemeList([...res.data]);
      return setItem('themeList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(
        'https://xcape-business-sdk-uploads-dev.s3.ap-northeast-2.amazonaws.com/json/hint/release.json',
        {
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    })
    .then(res => {
      setHintList([...res.data]);
      return setItem('hintList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(
        'https://xcape-business-sdk-uploads-dev.s3.ap-northeast-2.amazonaws.com/json/tag/release.json',
        {
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    })
    .then(res => {
      setTagList([...res.data]);
      return setItem('tagList', JSON.stringify(res.data));
    })
    .then(() => {
      return axios.get(
        'https://xcape-business-sdk-uploads-dev.s3.ap-northeast-2.amazonaws.com/json/view/release.json',
        {
          headers: {
            'Cache-Control': 'no-store',
          },
        },
      );
    })
    .then(res => {
      setViewList([...res.data]);
      return setItem('viewList', JSON.stringify(res.data));
    });
};
