
import {
  CREATE_BOOKING,
  BOOKING_TYPE,
  BASIC_INFO,
  APPOINTMENT_DETAIL,
  SCREENING,
} from "../types";

const initialState = {
  bookingType: '',
  client: {},
  date: null,
  duration: 1,
  message: '',
  screenMethod: 0,
}

function bookReducer(state = initialState, action) {
  const { type, payload }= action;

  switch (type) {
    case CREATE_BOOKING:
      return state;
    case BOOKING_TYPE:
      return {
        ...state,
        bookingType: payload,
      }; 
    case BASIC_INFO:
      return {
        ...state,
        client: payload,
      }; 
    case APPOINTMENT_DETAIL:
      return {
        ...state,
        date: payload.date,
        duration: payload.duration,
        message: payload.message,
      }; 
    case SCREENING:
      return {
        ...state,
        // screenMethod: payload.screenMethod,
        // ref1: payload.ref1,
        // ref2: payload.ref2,
        // idCard: payload.idCard
      };
    default:
      return state;
  }
}

export default bookReducer;