import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import {  useSelector } from 'react-redux';

const ProtectedRoute = ({  component: Component, ...rest }) => {
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);


  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
