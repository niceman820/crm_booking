import api from "../../utils/api";
import { setAlert } from './alert';
import {
  CREATE_BOOKING,
  BOOKING_TYPE,
  BASIC_INFO,
  APPOINTMENT_DETAIL,
  SCREENING,
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