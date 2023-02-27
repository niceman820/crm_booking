import React, { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import MainLayoutRouter from './MainLayoutRouter';
import CreateBookingPage from '../pages/booking/CreateBookingPage';

const MainRouter = () => {
  const { isAuthenticated } = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated
  }));
  return (
    <Routes>
      <Route path='login' element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
      <Route path='signup' element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
      <Route path='/new-booking/:bookFormId/:userName' element={<CreateBookingPage />} />
      
      <Route path='*' element={isAuthenticated ? <MainLayoutRouter /> : <LoginPage /> } />
    </Routes>
  );
}

export default MainRouter;