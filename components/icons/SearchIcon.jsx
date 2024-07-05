import React from 'react';
import {Colors} from '../../Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchIcon = ({color = Colors.black, size = 36}) => {
  return <Ionicons name={'search-outline'} color={color} size={size} />;
};

export default SearchIcon;
