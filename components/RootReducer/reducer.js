/* eslint-disable no-unreachable */
/* eslint-disable no-new-object */
const initialState = {
  selected: 'Starter',
  selectedtype: 1,
  cart: new Object(),
  user: new Object(),
  allitem: new Object(),
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_SELECTED_TYPE':
      state.selectedtype = action.payload[0];
      console.log('SELECTEDTYPE', state.selectedtype);
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };
      break;
    case 'CHANGE_SELECTED':
      state.selected = action.payload[0];
      console.log('SELECTED', state.selected);
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };
      break;
    case 'ADD_ALL_ITEM':
      state.allitem[action.payload[0]] = action.payload[1];
      console.log('ALLITEM', state.allitem);
      console.log('KEYS', Object.keys(state.allitem).length);
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };
    case 'ADD_ITEM':
      state.cart[action.payload[0]] = action.payload[1];
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };
      break;
    case 'REMOVE_ITEM':
      delete state.cart[action.payload];
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };
      break;
    case 'UPDATE_ITEM':
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };
      break;
    case 'REMOVE_ALL':
      state.cart = new Object();
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };
    case 'LOGIN':
      state.user[action.payload[0]] = action.payload[1];
      return {
        allitem: state.allitem,
        cart: state.cart,
        user: state.user,
        selected: state.selected,
        selectedtype: state.selectedtype,
      };

    default:
      return state;
  }
}
export default rootReducer;
