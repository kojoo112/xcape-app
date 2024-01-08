import {ScrollView} from 'react-native';
import React from 'react';
import ImageView from '../components/views/ImageView';
import VideoView from '../components/views/VideoView';
import AudioView from '../components/views/AudioView';
import PasswordTagView from '../components/views/PasswordTagView';
import CameraView from '../components/views/CameraView';

const componentList = {
  ImageView: ImageView,
  VideoView: VideoView,
  AudioView: AudioView,
  PasswordTagView: PasswordTagView,
  CameraView: CameraView,
};

const TagView = props => {
  const components = props.route.params.viewList;

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      {components.map((element, idx) => {
        const Component = componentList[element.component];

        if (element.component === 'PasswordTagView') {
          return (
            <Component
              key={idx}
              answer={element.answer}
              moveToTag={element.moveTo}
            />
          );
        } else if (element.component === 'CameraView') {
          return <Component key={idx} height={element.height || 400} />;
        } else {
          return <Component key={idx} url={element.url} />;
        }
      })}
    </ScrollView>
  );
};

export default TagView;
