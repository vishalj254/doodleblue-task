import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainComponent from './MainComponent';
import {useDispatch} from 'react-redux';
import {data} from './data';
import CartScreen from './CartScreen';

const Stack = createStackNavigator();

function MainNavigation(props) {
  const dispatch = useDispatch();
  data.map(item => {
    item.quantity = 0;
    item.amount = 0;
    dispatch({type: 'ADD_ALL_ITEM', payload: [item.id, item]});
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainComponent"
          component={MainComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            title: 'My Cart',
            headerStyle: {
              backgroundColor: '#0F1F2F',
              elevation: 0,
            },
            headerTintColor: 'white',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigation;
