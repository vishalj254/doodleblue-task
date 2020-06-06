/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
const {height, width} = Dimensions.get('screen');
import NumericInput from 'react-native-numeric-input';
import {RadioButton, Text as Text1} from 'react-native-paper';

function Item({item, props, dispatch, changeState, changeStateMain, length}) {
  const [quantityState, setQuantitystate] = React.useState(1);

  const quantityChange = (data, value) => {
    data.quantity = value;
    data.amount = data.price * value;
    dispatch({type: 'ADD_ALL_ITEM', payload: [data.id, data]});
    changeStateMain();
    changeState();
  };
  return (
    <>
      <View style={styles.item}>
        <View style={{flexDirection: 'row', padding: 10}}>
          <View>
            {item.status == 'NVEG' ? (
              <Text style={[styles.title, {padding: 3, color: 'red'}]}>
                {'N'}
                {'\n'}
                {'V'}
              </Text>
            ) : (
              <Text style={[styles.title, {padding: 2, color: 'green'}]}>
                {'V'}
              </Text>
            )}
          </View>
          <View style={{}}>
            <Text style={styles.title}> {item.name}</Text>
            <Text> {` ${item.description}`}</Text>
          </View>
          {item.quantity == 0 ? (
            <TouchableOpacity
              onPress={() => quantityChange(item, 1)}
              style={{
                marginTop: 10,
                alignContent: 'flex-end',
                marginLeft: 'auto',
                marginRight: 15,
                backgroundColor: '#E6B780',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                width: 60,
                height: 30,
              }}>
              <View>
                <Text>ADD</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginTop: 20,
                alignContent: 'flex-end',
                marginLeft: 'auto',
                marginRight: 20,
                justifyContent: 'center',
                alignItems: 'center',
                width: 80,
                height: 30,
              }}>
              <NumericInput
                value={item.quantity}
                onChange={value => {
                  setQuantitystate(value);
                  quantityChange(item, value);
                }}
                iconSize={25}
                step={1}
                valueType="real"
                rounded
                textColor="#B0228C"
              />
            </View>
          )}
        </View>
        <View style={{marginTop: '3%'}}>
          {/* <Text>{item.internlocations}</Text> */}
        </View>
      </View>
    </>
  );
}

const CartScreen = props => {
  const [showAll, setShowAll] = React.useState(false);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = React.useState(true);
  const allitem = useSelector(state => state.allitem);
  const alldata = Object.values(allitem);
  const total = alldata.reduce((a, b) => parseInt(a) + parseInt(b.amount), 0);
  const filterData = alldata.filter(item => {
    if (parseInt(item.quantity) > 0) {
      return item;
    }
  });
  const changeState = () => {
    setRefresh(!refresh);
    if (filterData.length < 2) {
      setShowAll(false);
    }
  };

  return (
    <>
      <View style={{height: height * 0.3, backgroundColor: '#0F1F2F'}}>
        <View
          style={{
            height: 100,
            backgroundColor: '#fff',
            width: width * 0.5,
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            marginTop: height * 0.09,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 18, fontWeight: '600', color: '#808080'}}>
            Total Cost
          </Text>
          <Text style={{fontSize: 20, fontWeight: '600'}}>₹ {total}</Text>
        </View>
      </View>
      <View style={{marginTop: 5, marginLeft: 20, width: width * 0.9}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>{'Review Orders'}</Text>
        {filterData.length > 0 ? (
          <>
            <FlatList
              data={showAll ? filterData : filterData.slice(0, 2)}
              renderItem={({item}) => (
                <Item
                  item={item}
                  props={props}
                  dispatch={dispatch}
                  changeState={changeState}
                  length={filterData.length}
                  changeStateMain={props.route.params.changeStateMain}
                />
              )}
              showsVerticalScrollIndicator={false}
              style={{marginTop: 5, height: showAll ? height * 0.38 : 'auto'}}
            />
          </>
        ) : (
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 25,
                color: 'green',
              }}>
              There is no item in the cart
            </Text>
          </View>
        )}
        {filterData.length > 2 && !showAll ? (
          <View>
            <Text
              onPress={() => setShowAll(true)}
              style={{
                textDecorationLine: 'underline',
                fontSize: 15,
                color: 'blue',
                textAlign: 'right',
              }}>
              Show More
            </Text>
          </View>
        ) : (
          <></>
        )}
        {showAll ? (
          <View>
            <Text
              onPress={() => setShowAll(false)}
              style={{
                textDecorationLine: 'underline',
                fontSize: 15,
                color: 'blue',
                textAlign: 'right',
                marginTop: 5,
              }}>
              Show Less
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      {filterData.length > 0 ? (
        <View style={{marginTop: 5, marginLeft: 20, width: width * 0.9}}>
          <Text style={{fontSize: 18, fontWeight: '600'}}>
            {'Delivery Options'}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <RadioButton.Group value={'first'}>
              <View style={{flexDirection: 'row'}}>
                <Text1 style={{marginTop: 7}}>Dine In</Text1>
                <RadioButton value="first" />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text1 style={{marginTop: 7}}>Take Away</Text1>
                <RadioButton value="second" />
              </View>
            </RadioButton.Group>
          </View>
        </View>
      ) : (
        <></>
      )}
      <TouchableOpacity
        style={styles.bottomView}
        onPress={() => Alert.alert('Order Placed!')}>
        <View>
          <Text style={styles.textStyle}>{'PLACE ORDER'}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomView: {
    width: '100%',
    height: 50,
    backgroundColor: '#0E1E2E',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute', //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: '#fff',
    fontSize: 18,
  },
  container: {
    flex: 1,
    marginTop: 5,
    padding: 10,
  },
  item: {
    borderColor: '#d1ccc0',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    width: width * 0.9,
    height: 'auto',
    borderWidth: 1,
    // elevation: 3,
  },
  imageStyle: {
    borderRadius: 10,
    width: 80,
    height: 75,
    marginBottom: 2,
    justifyContent: 'space-evenly',
  },
  loginContainer: {
    width: 150,
    flexDirection: 'row',
    backgroundColor: '#eb3b5a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#ecf0f1',
    // position:"absolute",
    alignSelf: 'center',
    borderRadius: 15,
  },
  headStyle: {
    marginBottom: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2991B8',
  },
  title2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 22,
  },
  title3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 22,
    color: '#2991B8',
  },
});
