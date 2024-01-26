import React, {useCallback} from 'react';

import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useRecoilState} from 'recoil';
import {currentThemeState, modalState} from '../atoms';
import NfcManager from 'react-native-nfc-manager';
import {setValue} from '../plugins/firebase';
import {setItem} from '../plugins/storage';
import {useNavigation} from '@react-navigation/native';

const CustomModal = () => {
  const navigation = useNavigation();
  const [currentTheme, setCurrentTheme] = useRecoilState(currentThemeState);
  const [{type, visible}, setModal] = useRecoilState(modalState);

  const startEscape = useCallback(() => {
    const {id, merchantId, runningTime} = currentTheme;
    const currentTime = new Date().getTime();
    const parameter = {
      ...currentTheme,
      isPlaying: true,
      startTime: currentTime,
      endTime: currentTime + runningTime * 60 * 1000,
    };
    setValue(`/gameStatus/${merchantId}/${id}`, parameter).then(() => {
      setItem('currentTheme', JSON.stringify(parameter)).then(() => {
        setModal({type, visible: false});
      });
    });
  }, []);

  return (
    <Modal
      animationType="none"
      visible={visible}
      onRequestClose={() => {
        type === 'TAG'
          ? NfcManager.cancelTechnologyRequest().then(() => {
              setModal({type, visible: false});
            })
          : null;
      }}
      transparent={true}>
      <View style={styles.container}>
        {/*TODO: Header 영역과 같은 세팅 버튼을 만드는지?*/}
        {/*<View*/}
        {/*  style={{*/}
        {/*    height: 120,*/}
        {/*    backgroundColor: 'red',*/}
        {/*    width: '100%',*/}
        {/*    opacity: 0.5,*/}
        {/*  }}></View>*/}
        {type === 'TAG' ? (
          <View style={styles.tagContainer}>
            <Image
              source={require('../assets/images/xcape-logo.png')}
              style={{width: 120}}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={styles.timerContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                startEscape();
              }}
              onLongPress={() => {
                navigation.navigate('Settings');
              }}>
              <Text style={{color: 'white', fontSize: 26}}>시작</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000090',
    alignItems: 'center',
  },
  tagContainer: {
    flex: 0.3,
    width: Dimensions.get('window').width * 0.8,
    backgroundColor: '#1B1B18',
    borderBottomLeftRadius: Dimensions.get('window').width / 2,
    borderBottomRightRadius: Dimensions.get('window').width / 2,
    borderColor: 'white',
    borderWidth: 1,
    borderTopWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    width: 200,
    paddingHorizontal: 20,
    backgroundColor: '#0095F6',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
