/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import {Image} from 'react-native';
import BasicExample from './BasicExample';
import {TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('screen');
import FIcon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import FFIcon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import NumericInput from 'react-native-numeric-input';

function Item({item, props, dispatch, changeState}) {
  const [quantityState, setQuantitystate] = React.useState(1);

  const quantityChange = (data, value) => {
    data.quantity = value;
    data.amount = data.price * value;
    dispatch({type: 'ADD_ALL_ITEM', payload: [data.id, data]});
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

const MainComponent = props => {
  const [refresh, setRefresh] = React.useState(true);
  const [visible, setvisible] = useState(false);
  const [refresh1, setRefresh1] = React.useState(false);
  const dispatch = useDispatch();
  const selectedname = useSelector(state => state.selected);
  const selectedtype = useSelector(state => state.selectedtype);
  console.log(`${selectedname} ${selectedtype}`);
  const allitem = useSelector(state => state.allitem);
  const alldata = Object.values(allitem);
  const filterData = alldata.filter(item => {
    if (item.type === selectedtype) {
      return item;
    }
  });
  console.log('...........', alldata);

  const changeFunction = () => {
    setvisible(false);
  };

  const changeState = () => {
    console.log('Refresh call Main...');
    setRefresh(!refresh);
  };

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('focused');
      setRefresh1(!refresh1);
      changeState();
    });
    changeState();
    return unsubscribe;
  }, [props.navigation]);

  return (
    <>
      <Image
        source={require('../images/food.jpeg')}
        style={{height: height * 0.3}}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          width: width * 0.9,
          flex: 1,
          marginLeft: 20,
          marginVertical: height * 0.25,
          height: 158,
          borderRadius: 5,
          elevation: 5,
          padding: 20,
        }}>
        <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
          Inka Restaurant
        </Text>
        <Text style={{textAlign: 'center', marginTop: 12, fontSize: 15}}>
          <FIcon name={'star-o'} size={15} /> 5.0(200+) | All days: 09:00 AM -
          06:00 PM
        </Text>
        <Text style={{textAlign: 'center', fontSize: 15, marginTop: 5}}>
          <FFIcon name={'phone-call'} size={15} /> Reach us at: 9854562142
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0A1F32',
            padding: 8,
            width: width * 0.45,
            marginLeft: '22%',
            borderRadius: 10,
            marginTop: 8,
          }}>
          <Text style={{color: 'white', fontSize: 15}}>BOOK A TABLE</Text>
        </View>
      </View>
      {/* Main Item */}

      <View
        style={{marginTop: height * 0.15, marginLeft: 20, width: width * 0.9}}>
        <Text style={{fontSize: 18, fontWeight: '600'}}>{selectedname}</Text>
        <FlatList
          data={filterData}
          renderItem={({item}) => (
            <Item
              item={item}
              props={props}
              dispatch={dispatch}
              changeState={changeState}
            />
          )}
          showsVerticalScrollIndicator={false}
          style={{height: height * 0.423, marginTop: 5}}
        />
      </View>

      {/* Bottom */}
      <BasicExample value={visible} changeFunction={changeFunction} />

      <TouchableOpacity
        onPress={() => setvisible(true)}
        style={{
          width: '0%',
          height: 30,
          backgroundColor: '#E6B780',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          position: 'absolute', //Here is the trick
          bottom: 60,
          marginLeft: '39%',
        }}>
        <View>
          <Text
            style={[styles.textStyle, {color: '#2B2D1C', fontWeight: '700'}]}>
            <IIcon name={'ios-restaurant'} size={18} />
            {' Menu'}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.bottomView}
        onPress={() =>
          props.navigation.navigate('CartScreen', {
            changeStateMain: changeState,
          })
        }>
        <View>
          <Text style={styles.textStyle}>
            <FIcon name={'shopping-cart'} size={20} /> {' View Cart'}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default MainComponent;

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
