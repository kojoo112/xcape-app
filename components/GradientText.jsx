import React from 'react';
import {LinearTextGradient} from 'react-native-text-gradient';
import PretendardText from './PretendardText';

const GradientText = ({text, colors, textStyle}) => {
  return (
    <LinearTextGradient
      locations={[0, 1]}
      colors={colors}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <PretendardText style={textStyle}>{text}</PretendardText>
    </LinearTextGradient>
  );
};

export default GradientText;
