import React, {useEffect} from 'react';

import {Image, StyleSheet, ToastAndroid, View} from 'react-native';
import {syncInitialData} from '../plugins/api';
import {useSetRecoilState} from 'recoil';
import {
  hintListState,
  merchantListState,
  tagListState,
  themeListState,
  viewListState,
} from '../atoms';
import {useInitialLoading} from '../context/InitialLoadingContext';
import {Colors} from '../Colors';

const Download = ({navigation}) => {
  const setMerchantList = useSetRecoilState(merchantListState);
  const setThemeList = useSetRecoilState(themeListState);
  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);
  const setViewList = useSetRecoilState(viewListState);

  const {setLoading} = useInitialLoading();

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
        setLoading(false);
      })
      .catch(e => {
        console.error(e);
        ToastAndroid.show('네트워크를 확인해주세요.', ToastAndroid.SHORT);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/progress-logo.png')}
        tintColor={'white'}
      />
    </View>
  );
};

export default Download;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
