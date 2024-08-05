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
import Download from './screens/Download';
import {TagModalProvider} from './context/TagModalContext';
import {PasswordModalProvider} from './context/PasswordModalContext';
import Select from './components/Select';
import {InitialLoadingProvider} from './context/InitialLoadingContext';
import TagPreview from './screens/TagPreview';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <RecoilRoot>
      <InitialLoadingProvider>
        <TagModalProvider>
          <PasswordModalProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName={'Home'}
                screenOptions={{
                  header: ({route}) => {
                    if (route.name === 'Home' || route.name === 'TagView') {
                      return <Header />;
                    }
                  },
                }}>
                <Stack.Screen name={'Home'} component={Home} />
                <Stack.Screen name={'TagView'} component={TagView} />
                <Stack.Screen name={'Download'} component={Download} />
                <Stack.Screen name={'Settings'} component={Settings} />
                <Stack.Screen name={'ThemeSelect'} component={ThemeSelect} />
                <Stack.Screen name={'TagSelect'} component={TagSelect} />
                <Stack.Screen name={'Select'} component={Select} />
                <Stack.Screen name={'TagPreview'} component={TagPreview} />
              </Stack.Navigator>
            </NavigationContainer>
          </PasswordModalProvider>
        </TagModalProvider>
      </InitialLoadingProvider>
    </RecoilRoot>
  );
}

export default App;
