import React, {useEffect} from 'react';

import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {syncInitialData} from '../plugins/api';
import {useSetRecoilState} from 'recoil';
import {
  hintListState,
  merchantListState,
  tagListState,
  themeListState,
  viewListState,
} from '../atoms';

const Download = ({navigation}) => {
  const setMerchantList = useSetRecoilState(merchantListState);
  const setThemeList = useSetRecoilState(themeListState);
  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);
  const setViewList = useSetRecoilState(viewListState);

  useEffect(() => {
    syncInitialData(
      setMerchantList,
      setThemeList,
      setHintList,
      setTagList,
      setViewList,
    )
      .then(() => {
        ToastAndroid.show('리소스 다운로드 성공!', ToastAndroid.SHORT);
        navigation.navigate('Home');
      })
      .catch(e => {
        console.error(e);
        ToastAndroid.show('네트워크를 확인해주세요.', ToastAndroid.SHORT);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Download Page</Text>
      <ActivityIndicator />
    </View>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
