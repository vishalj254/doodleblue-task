/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './components/RootReducer/reducer';
import MainNavigation from './components/MainNavigation';

console.disableYellowBox = true;

const App = props => {
  const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" />
      <MainNavigation />
    </Provider>
  );
};

export default App;
