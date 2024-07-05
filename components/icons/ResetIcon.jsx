import React from 'react';

import {Colors} from '../../Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ResetIcon = ({color = Colors.black, size = 36}) => {
  return <Ionicons name="repeat-outline" color={color} size={size} />;
};

export default ResetIcon;
