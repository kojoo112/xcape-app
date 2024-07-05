import React from 'react';
import {useRecoilValue} from 'recoil';
import {themeListState} from '../atoms';
import List from '../components/List';

const ThemeSelect = ({navigation, route}) => {
  const themeList = useRecoilValue(themeListState);
  const themeListByMerchantId = themeList.filter(
    theme => theme.merchantId === route.params.merchantId,
  );

  return (
    <List
      list={themeListByMerchantId}
      displayName={'nameKo'}
      onPress={value => {
        navigation.push('TagSelect', {themeId: value});
      }}
    />
  );
};

export default ThemeSelect;
