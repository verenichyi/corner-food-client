import React from 'react';
import { Navigate } from 'react-router-dom';
import RoutesList from '../../constants/routes';

const NotFound = () => {
  return <Navigate to={RoutesList.Home} />;
};

export default NotFound;
