import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import book from './bookReducer';

export default combineReducers({
  alert,
  auth,
  book,
});