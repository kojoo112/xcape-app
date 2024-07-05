import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';

const windowWidth = Dimensions.get('window').width;
const tapeImage = require('../../assets/images/tape_template/tape-image1.png');
const tapePlayImage = require('../../assets/images/tape_template/tape-play.gif');

const AudioView = props => {
  const [audioFlag, setAudioFlag] = useState(true);
  const [audio, setAudio] = useState();

  const audioInit = () => {
    const sound = new Sound(props.url, undefined, error => {
      if (error) {
        console.error('AudioView >>> play failed!');
      }
    });
    setAudio(sound);
  };

  useEffect(() => {
    audioInit();
  }, []);

  const handleAudioFlag = () => {
    if (audioFlag) {
      audio.play();
    } else {
      audio.stop();
    }
    setAudioFlag(!audioFlag);
  };

  return (
    <View style={styles.backgroundImage}>
      <View style={{backgroundColor: 'black'}}>
        {audioFlag ? (
          <Image source={tapeImage} style={styles.tape} resizeMode={'cover'} />
        ) : (
          <Image
            source={tapePlayImage}
            style={styles.tape}
            resizeMode={'cover'}
          />
        )}
      </View>
      <View style={{backgroundColor: 'red', height: 100}}>
        <ImageBackground
          source={require('../../assets/images/tape_template/controller.png')}
          style={styles.tapeController}
          resizeMode={'cover'}
        />
        <Pressable
          onPress={() => {
            handleAudioFlag();
          }}
          hitSlop={20}
          style={{
            position: 'absolute',
            top: 34,
            left: 240,
            width: 70,
            height: 60,
          }}></Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: windowWidth,
  },
  tape: {
    width: null,
    height: 200,
  },
  tapeController: {
    width: null,
    height: 100,
  },
});

export default AudioView;
