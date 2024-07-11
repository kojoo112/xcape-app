import React from 'react';
import {Text} from 'react-native';

const PretendardText = ({style, children}) => {
  return <Text style={{...style, fontFamily: 'Pretendard'}}>{children}</Text>;
};

export default PretendardText;
