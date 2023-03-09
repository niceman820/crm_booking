import api from "../../utils/api";
import { setAlert } from './alert';
import {
  APPROVED_BOOKING,
  DECLINED_BOOKING,
  DELETE_BOOKING_DATA,
  GET_BOOKING_DATA, GET_BOOKING_DETAIL_DATA, GET_EMAIL_NOTIFICATION,
} from "../types";

import axios from 'axios';
import config from "../../config/config";
// create booking
export const createBooking = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${config.BASE_URL}/booking/`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    console.log('register user ', res);

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const getBookingData = () => async (dispatch) => {
  try {
    const res = await api.get('/booking');
    dispatch({
      type: GET_BOOKING_DATA,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const getBookingDetail = (bookingId) => async (dispatch) => {
  try {
    const res = await api.get(`/booking/detail/${bookingId}`);
    dispatch({
      type: GET_BOOKING_DETAIL_DATA,
      payload: res.data
    })

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const approveBooking = (bookingId) => async (dispatch) => {
  try {
    const res = await api.put(`/booking/detail/${bookingId}`, { status: 2 });
    dispatch({
      type: APPROVED_BOOKING,
      payload: 2
    })

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const declineBooking = (bookingId) => async (dispatch) => {
  try {
    const res = await api.patch(`/booking/detail/${bookingId}`, { status: 1 });
    dispatch({
      type: DECLINED_BOOKING,
      payload: 1
    })

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const deleteBookings = (data) => async (dispatch) => {

  try {
    const res = await api.post('/booking/delete', data);
    dispatch({
      type: DELETE_BOOKING_DATA,
      payload: data.bookingIds
    })

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const getBookingFormData = (bookFormId) => async (dispatch) => {
  try {
    const res = await api.get(`/booking/custom-notification/${bookFormId}`);
    dispatch({
      type: GET_EMAIL_NOTIFICATION,
      payload: res.data
    })
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const customBookingForm = (data) => async (dispatch) => {
  try {
    const res = await axios.post(
      `${config.BASE_URL}/booking/custom-booking`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      }
    );
    console.log('update booking data ', res.data);
    // dispatch({
    //   type: GET_EMAIL_NOTIFICATION,
    //   payload: res.data
    // })
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const customEmailNotification = (data) => async (dispatch) => {
  try {
    const res = await api.post('/booking/custom-email-notification', data);
    // const res = await api.post('/booking/custom-booking', data);

    console.log('update booking data ', res.data);
    // dispatch({
    //   type: GET_EMAIL_NOTIFICATION,
    //   payload: res.data
    // })
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}

export const searchBooking = (data) => async (dispatch) => {
  try {
    const res = await api.post('/booking/search-booking', data);
    dispatch({
      type: GET_BOOKING_DATA,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')));
    }
  }
}