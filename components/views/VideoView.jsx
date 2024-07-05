import React from 'react';
import {StyleSheet, View} from 'react-native';
import VideoPlayer from 'react-native-media-console';

const VideoView = props => {
  return (
    <View style={styles.container}>
      <View style={styles.videoWrapper}>
        <VideoPlayer
          source={{uri: props.url}}
          rewindTime={3}
          disableBack={true}
          resizeMode={'contain'}
          disableFullscreen={true}
          disableVolume={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebeb',
  },
  videoWrapper: {
    width: '100%',
    height: 400,
  },
});

export default VideoView;
