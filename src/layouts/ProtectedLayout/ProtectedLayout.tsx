import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import RoutesList from '../../constants/routes';

const ProtectedLayout = () => {
  const { isAuthorized } = useAppSelector(selectAuth);
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to={RoutesList.SIGN_IN} replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
