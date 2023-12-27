import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ThemeSetting from './ThemeSetting';
import TagWrite from './TagWrite';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Settings = () => {
  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarLabelStyle: {fontSize: 16},
        tabBarStyle: {backgroundColor: '#212429'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '테마세팅') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === '태그쓰기') {
            iconName = focused ? 'pencil' : 'pencil-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={'테마세팅'} component={ThemeSetting} />
      <Tab.Screen name={'태그쓰기'} component={TagWrite} />
    </Tab.Navigator>
  );
};

export default Settings;
