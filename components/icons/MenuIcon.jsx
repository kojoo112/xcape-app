import React from 'react';
import {Colors} from '../../Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MenuIcon = ({color = Colors.black, size = 36}) => {
  return <Ionicons name="reorder-two-outline" color={color} size={size} />;
};

export default MenuIcon;
