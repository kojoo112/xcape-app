import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Colors';

const EyeIcon = ({color = Colors.black, size = 36}) => {
  return <Ionicons name={'eye-outline'} color={color} size={size} />;
};

export default EyeIcon;
