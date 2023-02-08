import axios from 'axios';
import {
  CATEGORY_LIST_FAILURE,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  ORDER_SET_TYPE,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILURE,
  ORDER_ADD_ITEM,
  ORDER_REMOVE_ITEM,
  ORDER_CLEAR,
  ORDER_SET_PAYMENT_TYPE,
  ORDER_CREATE_FAILURE,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILURE,
  SCREEN_SET_WIDTH,
  ORDER_QUEUE_LIST_REQUEST,
  ORDER_QUEUE_LIST_SUCCESS,
  ORDER_QUEUE_LIST_FAILURE
} from './Constants';

export const setOrderType = (dispatch, orderType) => {
  return dispatch({
    type: ORDER_SET_TYPE,
    payload: orderType
  });
};

export const listCategories = async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/categories`);
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: CATEGORY_LIST_FAILURE, payload: err.message });
  }
};

export const listProducts = async (dispatch, categoryName = '') => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const { data } = await axios.get(`/api/products?category=${categoryName}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAILURE, payload: err.message });
  }
};

export const addToOrder = async (dispatch, item) => {
  dispatch({ type: ORDER_ADD_ITEM, payload: item });
};

export const removeFromOrder = async (dispatch, item) => {
  dispatch({ type: ORDER_REMOVE_ITEM, payload: item });
};

export const clearOrder = async (dispatch) => {
  dispatch({ type: ORDER_CLEAR });
};

export const setPaymentType = async (dispatch, paymentType) => {
  return dispatch({ type: ORDER_SET_PAYMENT_TYPE, payload: paymentType });
};

export const createOrder = async (dispatch, order) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { data } = await axios.post('/api/orders', order);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: ORDER_CLEAR });
  } catch (err) {
    dispatch({ type: ORDER_CREATE_FAILURE, payload: err.message });
  }
};

export const listOrders = async (dispatch) => {
  dispatch({ type: SCREEN_SET_WIDTH });
  dispatch({ type: ORDER_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/orders');
    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ORDER_LIST_FAILURE, payload: err.message });
  }
};

export const listQueue = async (dispatch) => {
  dispatch({ type: SCREEN_SET_WIDTH });
  dispatch({ type: ORDER_QUEUE_LIST_REQUEST });
  try {
    const { data } = await axios.get('/api/orders/queue');
    dispatch({ type: ORDER_QUEUE_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: ORDER_QUEUE_LIST_FAILURE, payload: err.message });
  }
};
