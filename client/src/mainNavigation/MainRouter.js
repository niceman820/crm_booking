import React, { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginPage from '../pages/auth/LoginPage';
import SignupPage from '../pages/auth/SignupPage';
import MainLayoutRouter from './MainLayoutRouter';

const MainRouter = () => {
  const { isAuthenticated } = useSelector(state => ({
    isAuthenticated: state.auth.isAuthenticated
  }));
  return (
    <Routes>
      <Route path='login' element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
      <Route path='signup' element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
      <Route path='*' element={isAuthenticated ? <MainLayoutRouter /> : <LoginPage /> } />
    </Routes>
  );
}

export default MainRouter;