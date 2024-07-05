import React from 'react';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Colors';

const EyeOffIcon = ({color = Colors.black, size = 36}) => {
  return <Ionicons name={'eye-off-outline'} color={color} size={size} />;
};

export default EyeOffIcon;
