import React, { createContext, useReducer } from 'react';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAILURE,
  ORDER_SET_TYPE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_CLEAR,
  ORDER_SET_PAYMENT_TYPE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAILURE,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  SCREEN_SET_WIDTH,
  ORDER_QUEUE_LIST_REQUEST,
  ORDER_QUEUE_LIST_SUCCESS,
  ORDER_QUEUE_LIST_FAILURE
} from './Constants';

export const Store = createContext();

const initialState = {
  widthScreen: false,
  categoryList: { loading: true },
  productList: { loading: true },
  order: {
    orderType: 'Eat in',
    orderItems: [],
    taxPrice: 0,
    totalPrice: 0,
    itemsCount: 0,
    paymentType: 'Pay here'
  },
  orderCreate: { loading: true },
  orderList: { loading: true },
  queueList: { loading: true }
};

const reducer = (state, action) => {
  switch (action.type) {
    case SCREEN_SET_WIDTH:
      return {
        ...state,
        widthScreen: true
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
    case PRODUCT_LIST_REQUEST:
      return {
        ...state,
        productList: { loading: true }
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        productList: { loading: false, products: action.payload, error: '' }
      };
    case PRODUCT_LIST_FAILURE:
      return {
        ...state,
        productList: { loading: false, error: action.payload }
      };
    case ORDER_ADD_ITEM: {
      const item = action.payload;
      const itemExists = state.order.orderItems.find((x) => x.name === item.name);

      const orderItems = itemExists
        ? state.order.orderItems.map((x) => (x.name === itemExists.name ? item : x))
        : [...state.order.orderItems, item];

      const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
      const itemsPrice = orderItems.reduce((a, c) => a + c.quantity * c.price, 0);
      const taxPrice = Math.round(0.05 * itemsPrice * 100) / 100;

      const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100;

      return {
        ...state,
        order: {
          ...state.order,
          orderItems,
          taxPrice,
          totalPrice,
          itemsCount
        }
      };
    }
    case ORDER_REMOVE_ITEM:
      const orderItems = state.order.orderItems.filter((x) => x.name !== action.payload.name);

      const itemsCount = orderItems.reduce((a, c) => a + c.quantity, 0);
      const itemsPrice = orderItems.reduce((a, c) => a + c.quantity * c.price, 0);
      const taxPrice = Math.round(0.05 * itemsPrice * 100) / 100;

      const totalPrice = Math.round((itemsPrice + taxPrice) * 100) / 100;

      return {
        ...state,
        order: {
          ...state.order,
          orderItems,
          taxPrice,
          totalPrice,
          itemsCount
        }
      };
    case ORDER_CLEAR:
      return {
        ...state,
        order: {
          orderItems: [],
          taxPrice: 0,
          totalPrice: 0,
          itemsCount: 0
        }
      };
    case ORDER_SET_TYPE:
      return {
        ...state,
        order: { ...state.order, orderType: action.payload }
      };
    case ORDER_SET_PAYMENT_TYPE:
      return {
        ...state,
        order: { ...state.order, paymentType: action.payload }
      };
    case ORDER_CREATE_REQUEST:
      return {
        ...state,
        orderCreate: { loading: true }
      };
    case ORDER_CREATE_SUCCESS:
      return {
        ...state,
        orderCreate: { loading: false, newOrder: action.payload }
      };
    case ORDER_CREATE_FAILURE:
      return {
        ...state,
        orderCreate: { loading: false, error: action.payload }
      };
    case ORDER_LIST_REQUEST:
      return {
        ...state,
        orderList: { loading: true }
      };
    case ORDER_LIST_SUCCESS:
      return {
        ...state,
        orderList: { loading: false, orders: action.payload, error: '' }
      };
    case ORDER_LIST_FAILURE:
      return {
        ...state,
        orderList: { loading: false, error: action.payload }
      };
    case ORDER_QUEUE_LIST_REQUEST:
      return {
        ...state,
        queueList: { loading: true }
      };
    case ORDER_QUEUE_LIST_SUCCESS:
      return {
        ...state,
        queueList: { loading: false, queue: action.payload, error: '' }
      };
    case ORDER_QUEUE_LIST_FAILURE:
      return {
        ...state,
        queueList: { loading: false, error: action.payload }
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
