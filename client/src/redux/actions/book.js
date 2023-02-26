import api from "../../utils/api";
import { setAlert } from './alert';
import {
  APPROVED_BOOKING,
  DECLINED_BOOKING,
  DELETE_BOOKING_DATA,
  GET_BOOKING_DATA, GET_BOOKING_DETAIL_DATA,
} from "../types";

import axios from 'axios';
// create booking
export const createBooking = (data) => async (dispatch) => {
  console.log("formData", data);
  try {
    const res = await axios.post('http://localhost:5000/api/booking/', data, { headers: { 'Content-Type': 'multipart/form-data', } });
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
    // console.log('booking detail data here ', res.data);
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
    const res = await api.put(`/booking/detail/${bookingId}`, {status: 2});
    console.log('booking detail data here ', res.data);
    dispatch(setAlert(res.data.message, 'success'));
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
    const res = await api.patch(`/booking/detail/${bookingId}`, {status: 1});
    console.log('booking detail data here ', res.data);
    dispatch(setAlert(res.data.message, 'error'));
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
    console.log('booking ids ', data)
    const res = await api.post('/booking/delete', data);
    console.log('delete ', data.bookingIds);
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