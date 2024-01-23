import React, {useEffect, useRef, useState} from 'react';

import {
  ActivityIndicator,
  Button,
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
import {syncInitialData} from '../api/api';
import {Picker} from '@react-native-picker/picker';
import {setValue} from '../api/firebase';
import {hasInitialData, setItem} from '../storage/storage';

const defaultTime = 50;

const ThemeSetting = ({navigation}) => {
  const [merchantList, setMerchantList] = useRecoilState(merchantListState);
  const [themeList, setThemeList] = useRecoilState(themeListState);

  const [merchantItems, setMerchantItems] = useState([]);
  const [themeItems, setThemeItems] = useState([]);

  const [currentMerchantId, setCurrentMerchantId] = useState();
  const [currentThemeId, setCurrentThemeId] = useState();

  const [runningTime, setRunningTime] = useState(defaultTime);

  const [synchronizing, setSynchronizing] = useState(false);

  const setHintList = useSetRecoilState(hintListState);
  const setTagList = useSetRecoilState(tagListState);

  const setCurrentTheme = useSetRecoilState(currentThemeState);
  const ref = useRef(null);
  const merchantOnChange = merchantId => {
    setCurrentMerchantId(merchantId);
    const themeItems = themeList
      .filter(theme => theme.merchantId === merchantId)
      .map(theme => {
        return (
          <Picker.Item key={theme.id} label={theme.nameKo} value={theme.id} />
        );
      });
    const pickerItems = [
      <Picker.Item key={0} label="테마를 선택해 주세요." value={null} />,
    ];
    pickerItems.push(themeItems);
    setThemeItems(pickerItems);
  };

  const saveThemeInfo = () => {
    if (!!ref.current.props.selectedValue && runningTime > 0) {
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
    setMerchantItems(
      merchantList.map(merchant => {
        return (
          <Picker.Item
            key={merchant.id}
            label={merchant.name}
            value={merchant.id}
          />
        );
      }),
    );
  }, [merchantList]);

  return (
    <View style={styles.container}>
      <View style={styles.wrapperBox}>
        <View style={styles.content}>
          <Text style={styles.label}>가맹점</Text>
          <View style={styles.input}>
            <Picker
              selectedValue={currentMerchantId}
              onValueChange={merchantId => {
                merchantOnChange(merchantId);
              }}>
              {merchantItems}
            </Picker>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>테마</Text>
          <View style={styles.input}>
            <Picker
              ref={ref}
              selectedValue={currentThemeId}
              onValueChange={themeId => {
                setCurrentThemeId(themeId);
              }}>
              {themeItems}
            </Picker>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>시간 설정</Text>
          <View style={styles.input}>
            <TextInput
              style={styles.timeInput}
              onChangeText={time => setRunningTime(parseInt(time))}
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
    flex: 0.8,
  },
  timeInput: {
    width: 100,
    backgroundColor: '#717171',
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
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
