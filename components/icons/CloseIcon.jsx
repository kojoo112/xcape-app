import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CloseIcon = ({color = 'white', size = 36}) => {
  return <Ionicons name="close-outline" color={color} size={size} />;
};

export default CloseIcon;
