import api from '../../utils/api';
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from '../types';
import setAuthToken from '../../utils/setAuthToken';

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await api.get('/auth');
    // if (res.data.role === 'admin') {
    //   dispatch({
    //     type: USER_ADMIN,
    //     payload: res.data
    //   })
    // } else {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
    // }
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

// Register User
export const signup = (data) => async (dispatch) => {
  try {
    const res = await api.post('/users', data);
    console.log('register user ', res.data);
    setAuthToken(res.data.token);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    await dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
}

// Login User
export const login = (data) => async (dispatch) => {

  try {
    const res = await api.post('/auth', data);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    await dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => (dispatch) => {
  setAuthToken();
  dispatch({
    type: LOGOUT
  });
};