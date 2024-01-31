import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {
  currentThemeState,
  hintListState,
  merchantListState,
  tagListState,
  themeListState,
} from '../atoms';
import {syncInitialData} from '../plugins/api';
import {setValue} from '../plugins/firebase';
import {setItem} from '../plugins/storage';

const defaultTime = 50;

const ThemeSetting = ({navigation}) => {
  const [merchantList, setMerchantList] = useRecoilState(merchantListState);
  const [themeList, setThemeList] = useRecoilState(themeListState);
  const [treeList, setTreeList] = useState([{}]);

  const [currentMerchantId, setCurrentMerchantId] = useState();
  const [currentThemeId, setCurrentThemeId] = useState();

  const [runningTime, setRunningTime] = useState(defaultTime);

  const [synchronizing, setSynchronizing] = useState(false);

  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);

  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);

  const saveThemeInfo = () => {
    if (!!currentMerchantId && !!currentThemeId && runningTime > 0) {
      const {nameKo} = themeList.find(theme => theme.id === currentThemeId);
      const currentTheme = {
        id: currentThemeId,
        merchantId: currentMerchantId,
        nameKo,
        runningTime,
      };
      setCurrentTheme(currentTheme);
      setItem('currentTheme', JSON.stringify(currentTheme))
        .then(() => {
          return setValue(
            `/gameStatus/${currentMerchantId}/${currentThemeId}`,
            {
              nameKo,
              runningTime,
              isPlaying: false,
            },
          );
        })
        .then(() => {
          navigation.navigate('Home');
        });
    } else {
      ToastAndroid.show('테마 세팅을 해주세요!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    setCurrentMerchantId(currentTheme.merchantId);
    setCurrentThemeId(currentTheme.id);

    const treeList = merchantList
      .map(merchant => {
        const currentThemeList = themeList
          .filter(theme => theme.merchantId === merchant.id)
          .sort(
            (a, b) => (a.id !== currentTheme.id) - (b.id !== currentTheme.id),
          );

        return {
          ...merchant,
          themeList: currentThemeList,
        };
      })
      .sort(
        (a, b) =>
          (a.id !== currentTheme.merchantId) -
          (b.id !== currentTheme.merchantId),
      );

    setTreeList(treeList);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperBox}>
        {treeList &&
          treeList.map(merchant => {
            return (
              <View key={merchant.id} style={styles.content}>
                <Text style={styles.label}>{merchant.name}</Text>
                <ScrollView style={styles.input} horizontal={true}>
                  <View style={{flexDirection: 'row'}}>
                    {merchant.themeList &&
                      merchant.themeList.map(theme => {
                        return (
                          <TouchableOpacity
                            key={theme.id}
                            style={
                              currentThemeId === theme.id
                                ? {
                                    ...styles.buttonGroup,
                                    backgroundColor: '#0095F6',
                                  }
                                : styles.buttonGroup
                            }
                            onPress={() => {
                              setCurrentMerchantId(merchant.id);
                              setCurrentThemeId(theme.id);
                            }}>
                            <Text style={styles.buttonText}>
                              {theme.nameKo}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                  </View>
                </ScrollView>
              </View>
            );
          })}
        <View style={{...styles.content}}>
          <Text style={styles.label}>시간 설정</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.timeInput}
              onChangeText={time => setRunningTime(parseInt(time))}
              defaultValue={currentTheme.runningTime.toString()}
              inputMode="decimal"
              keyboardType="numeric"
              placeholder={'분 단위'}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            saveThemeInfo();
          }}>
          <Text style={styles.buttonText}>테마정보 저장</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={synchronizing ? {...styles.button, opacity: 0.7} : styles.button}
        disabled={synchronizing}
        onPress={() => {
          setSynchronizing(true);
          syncInitialData(
            setMerchantList,
            setThemeList,
            setHintList,
            setTagList,
          ).then(() => setSynchronizing(false));
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.buttonText}>힌트 동기화</Text>
          {synchronizing ? <ActivityIndicator /> : <></>}
        </View>
      </TouchableOpacity>

      {/*<Button*/}
      {/*  title="확인"*/}
      {/*  onPress={() =>*/}
      {/*    AsyncStorage.getAllKeys(null).then(res => console.log(res))*/}
      {/*  }></Button>*/}
      {/*<Button*/}
      {/*  title="삭제"*/}
      {/*  color="red"*/}
      {/*  onPress={() => AsyncStorage.clear().then(hasInitialData)}></Button>*/}
    </View>
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353a40',
    justifyContent: 'center',
  },
  wrapperBox: {
    backgroundColor: '#212429',
    marginHorizontal: 20,
    marginVertical: 40,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: 'white',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  label: {
    flex: 0.3,
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    flex: 1,
  },
  timeInput: {
    width: 100,
    backgroundColor: '#717171',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  buttonGroup: {
    margin: 3,
    paddingHorizontal: 20,
    backgroundColor: '#424753',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  button: {
    width: '95%',
    margin: 15,
    paddingHorizontal: 20,
    backgroundColor: '#0095F6',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});
