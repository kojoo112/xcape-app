import {ScrollView} from 'react-native';
import React from 'react';
import ImageView from '../components/views/ImageView';
import VideoView from '../components/views/VideoView';
import AudioView from '../components/views/AudioView';
import AnswerView from '../components/views/AnswerView';
import CameraView from '../components/views/CameraView';

const hintView = {
  IMAGE: ImageView,
  VIDEO: VideoView,
  AUDIO: AudioView,
  ANSWER: AnswerView,
  CAMERA: CameraView,
};

const TagView = props => {
  const viewList = props.route.params.viewList;

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      {viewList.map(view => {
        const {type, answer, targetTagId, height, url} = view;
        const Component = hintView[type];

        return (
          <Component
            key={view.id}
            answer={answer}
            targetTagId={targetTagId}
            height={height}
            url={url}
          />
        );
      })}
    </ScrollView>
  );
};

export default TagView;
