/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {data as exdata} from './data';
import Dialog, {SlideAnimation, DialogContent} from 'react-native-popup-dialog';
import {useDispatch} from 'react-redux';

let data = [
  {text: 'Starter', id: 1},
  {text: 'Main Course', id: 2},
  {text: 'Dessert', id: 3},
  {text: 'Drinks', id: 4},
];

const BasicExample = props => {
  const dispatch = useDispatch();

  const dispatchFunction = item => {
    dispatch({type: 'CHANGE_SELECTED_TYPE', payload: [item.id]});
    dispatch({type: 'CHANGE_SELECTED', payload: [item.text]});
  };

  var arr = [];
  var data1 = exdata.filter(item => {
    if (item.type === 1) {
      return item;
    }
  });
  arr.push(data1.length);
  var data2 = exdata.filter(item => {
    if (item.type === 2) {
      return item;
    }
  });
  arr.push(data2.length);
  var data3 = exdata.filter(item => {
    if (item.type === 3) {
      return item;
    }
  });
  arr.push(data3.length);
  var data4 = exdata.filter(item => {
    if (item.type === 4) {
      return item;
    }
  });
  arr.push(data4.length);
  const [selected, setselected] = useState(1);
  const [Visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(props.value);
  }, [props.value]);

  return (
    <View style={{padding: 20, width: 200}}>
      <Dialog
        visible={Visible}
        onTouchOutside={() => {
          props.changeFunction();
        }}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }>
        <DialogContent>
          {data.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setselected(item.id);
                dispatchFunction(item);
                props.changeFunction();
              }}
              style={{marginTop: index === 0 ? 15 : 0}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    fontWeight: selected === item.id ? 'bold' : 'normal',
                  }}>
                  {item.text}
                </Text>
                <Text>{'                             '}</Text>
                <Text
                  style={{
                    fontWeight: selected === item.id ? 'bold' : 'normal',
                  }}>
                  {`${arr[index]}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </DialogContent>
      </Dialog>
    </View>
  );
};

export default BasicExample;
