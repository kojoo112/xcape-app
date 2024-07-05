import React, {useEffect, useState} from 'react';

import {
  ActivityIndicator,
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
  viewListState,
} from '../atoms';
import {syncInitialData} from '../plugins/api';
import {getValue, setValue} from '../plugins/firebase';
import {setItem} from '../plugins/storage';
import {Colors} from '../Colors';

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
  const setViewList = useSetRecoilState(viewListState);

  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);

  const saveThemeInfo = () => {
    if (!!currentMerchantId && !!currentThemeId && runningTime > 0) {
      const findTheme = themeList.find(theme => theme.id === currentThemeId);

      getValue(`/gameStatus/theme-${currentThemeId}`).then(theme => {
        if (theme) {
          setCurrentTheme({...theme, runningTime});
          setItem('themeId', currentThemeId.toString()).then(() => {
            navigation.navigate('Home');
          });
        } else {
          const value = {
            ...currentTheme,
            id: currentThemeId,
            merchantId: currentMerchantId,
            nameKo: findTheme.nameKo,
            runningTime,
          };
          setValue(`/gameStatus/theme-${currentThemeId}`, value).then(() => {
            navigation.navigate('Home');
          });
          setCurrentTheme({...value});
        }
      });
    } else {
      ToastAndroid.show('테마 세팅을 해주세요!', ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    setCurrentMerchantId(currentTheme.merchantId);
    setCurrentThemeId(currentTheme.id);
    const treeList = merchantList.map(merchant => {
      const currentThemeList = themeList
        .filter(theme => theme.merchantId === merchant.id)
        .sort(
          (a, b) => (a.id !== currentTheme.id) - (b.id !== currentTheme.id),
        );

      return {
        ...merchant,
        themeList: currentThemeList,
      };
    });
    // .sort(
    //   (a, b) =>
    //     (a.id !== currentTheme.merchantId) -
    //     (b.id !== currentTheme.merchantId),
    // );

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
                                    backgroundColor: Colors.primary,
                                  }
                                : styles.buttonGroup
                            }
                            onPress={() => {
                              setCurrentMerchantId(merchant.id);
                              setCurrentThemeId(theme.id);
                            }}>
                            <Text
                              style={{
                                color:
                                  currentThemeId === theme.id
                                    ? Colors.black
                                    : Colors.white,
                              }}>
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
              onChangeText={time => setRunningTime(parseInt(time, 10))}
              defaultValue={defaultTime.toString()}
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
            setViewList,
          ).then(() => setSynchronizing(false));
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.buttonText}>힌트 동기화</Text>
          {synchronizing ? <ActivityIndicator /> : <></>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ThemeSetting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
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
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: Colors.black,
  },
});
