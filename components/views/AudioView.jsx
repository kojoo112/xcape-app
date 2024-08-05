import {Dimensions, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Sound from 'react-native-sound';
import {Colors} from '../../Colors';

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
      <View style={{backgroundColor: Colors.black}}>
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
      <View style={{backgroundColor: Colors.black}}>
        <Image
          source={require('../../assets/images/tape_template/play-button.png')}
          style={styles.tapeController}
          resizeMode={'center'}
        />
        <Pressable
          onPress={() => {
            handleAudioFlag();
          }}
          hitSlop={20}
          style={{
            position: 'absolute',
            top: 70,
            left: 120,
            width: 90,
            height: 100,
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
    width: '100%',
    height: 173,
  },
});

export default AudioView;
