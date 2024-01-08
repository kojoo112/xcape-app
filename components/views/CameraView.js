import {Dimensions, View} from 'react-native';
import React, {useRef} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import LoadingView from './LoadingView';

const CameraView = props => {
  const height = Number(props.height);
  const windowWidth = Dimensions.get('window').width;
  const cameraRef = useRef(null);

  const device = useCameraDevice('back');

  if (device == null) return <LoadingView />;
  return (
    <View style={{width: windowWidth, height: height}}>
      <Camera
        style={{flex: 1}}
        ref={cameraRef}
        device={device}
        isActive={true}
      />
    </View>
  );
};

export default CameraView;
