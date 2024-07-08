import {ScrollView} from 'react-native';
import React from 'react';
import ImageView from '../components/views/ImageView';
import VideoView from '../components/views/VideoView';
import AudioView from '../components/views/AudioView';
import AnswerView from '../components/views/AnswerView';
import CameraView from '../components/views/CameraView';
import HintView from '../components/views/HintView';

const hintView = {
  IMAGE: ImageView,
  VIDEO: VideoView,
  AUDIO: AudioView,
  ANSWER: AnswerView,
  CAMERA: CameraView,
  HINT: HintView,
};

const TagView = props => {
  const viewList = props.route.params.viewList;

  return (
    <ScrollView style={{backgroundColor: 'black'}}>
      {viewList.map(view => {
        const {type, answer, targetTagId, height, url, message1, message2} =
          view;
        const Component = hintView[type];

        return (
          <Component
            key={view.id}
            answer={answer}
            targetTagId={targetTagId}
            height={height}
            url={url}
            message1={message1}
            message2={message2}
          />
        );
      })}
    </ScrollView>
  );
};

export default TagView;
