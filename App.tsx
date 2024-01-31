import React from 'react';
import {RecoilRoot} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './screens/Home';
import Header from './components/Header';
import Settings from './screens/Settings';
import TagView from './screens/TagView';
import ThemeSelect from './screens/ThemeSelect';
import TagSelect from './screens/TagSelect';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            header: () => <Header />,
          }}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="TagView" component={TagView} />
          <Stack.Screen
            options={{headerShown: false}}
            name="Settings"
            component={Settings}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="ThemeSelect"
            component={ThemeSelect}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="TagSelect"
            component={TagSelect}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  );
}

export default App;
