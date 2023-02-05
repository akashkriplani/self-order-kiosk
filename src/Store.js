import React, { createContext, useReducer } from 'react';
import { CATEGORY_LIST_REQUEST, CATEGORY_LIST_SUCCESS, CATEGORY_LIST_FAILURE, ORDER_SET_TYPE } from './Constants';

export const Store = createContext();

const initialState = {
  categoryList: { loading: true, categories: [], error: '' },
  order: {
    orderType: 'Eat in'
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case ORDER_SET_TYPE:
      return {
        ...state,
        order: { ...state.order, orderType: action.payload }
      };
    case CATEGORY_LIST_REQUEST:
      return {
        ...state,
        categoryList: { loading: true }
      };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        categoryList: { loading: false, categories: action.payload, error: '' }
      };
    case CATEGORY_LIST_FAILURE:
      return {
        ...state,
        categoryList: { loading: false, error: action.payload }
      };
    default:
      return state;
  }
};

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
