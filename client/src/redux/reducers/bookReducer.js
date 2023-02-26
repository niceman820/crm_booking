
import {
  CREATE_BOOKING,
  BOOKING_TYPE,
  BASIC_INFO,
  APPOINTMENT_DETAIL,
  GET_BOOKING_DATA,
  GET_BOOKING_DETAIL_DATA,
  DELETE_BOOKING_DATA,
  APPROVED_BOOKING,
  DECLINED_BOOKING,
} from "../types";

const initialState = {
  bookFormId: '',
  bookingType: '',
  client: {},
  date: null,
  duration: 1,
  message: '',
  screenMethod: 0,
  bookingData: [],
  bookingDetailData: {}
}

function bookReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_BOOKING:
      return state;
    case BOOKING_TYPE:
      return {
        ...state,
        bookingType: payload.bookingType,
        bookFormId: payload.bookFormId,
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
    case GET_BOOKING_DATA:
      return {
        ...state,
        bookingData: payload
      };
    case GET_BOOKING_DETAIL_DATA:
      return {
        ...state,
        bookingDetailData: payload
      };
    case DELETE_BOOKING_DATA:
      return {
        ...state,
        bookingData: state.bookingData.filter(
          bookingDatum => (!payload.includes(bookingDatum.id))
        )
      };
    case APPROVED_BOOKING:
      return {
        ...state,
        bookingDetailData: { ...state.bookingDetailData, status: 2 }
      };
    case DECLINED_BOOKING:
      return {
        ...state,
        bookingDetailData: { ...state.bookingDetailData, status: 1 }
      };
    default:
      return state;
  }
}

export default bookReducer;