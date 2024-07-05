import React from 'react';

import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ThemeSetting from './ThemeSetting';
import TagWrite from './TagWrite';
import {Colors} from '../Colors';
import SettingIcon from '../components/icons/SettingIcon';
import SettingOutlineIcon from '../components/icons/SettingOutlineIcon';
import PencilIcon from '../components/icons/PencilIcon';
import PencilOutlineIcon from '../components/icons/PencilOutlineIcon';

const Tab = createBottomTabNavigator();

const Settings = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabel: ({focused, color}) => {
          let fontColor = focused ? Colors.primary : color;
          return <Text style={{color: fontColor}}>{route.name}</Text>;
        },
        tabBarLabelStyle: {fontSize: 16},
        tabBarStyle: {backgroundColor: Colors.black},
        tabBarIcon: ({focused, color, size}) => {
          let IconComponent;
          if (route.name === '테마세팅') {
            IconComponent = focused ? (
              <SettingIcon color={Colors.primary} size={size} />
            ) : (
              <SettingOutlineIcon color={color} size={size} />
            );
          } else if (route.name === '태그쓰기') {
            IconComponent = focused ? (
              <PencilIcon color={Colors.primary} size={size} />
            ) : (
              <PencilOutlineIcon color={color} size={size} />
            );
          }

          return IconComponent;
        },
      })}>
      <Tab.Screen name={'테마세팅'} component={ThemeSetting} />
      <Tab.Screen name={'태그쓰기'} component={TagWrite} />
    </Tab.Navigator>
  );
};

export default Settings;
