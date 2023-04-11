import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import RoutesList from '../../constants/routes';
import styles from './styles.module.scss';
import Navbar from '../../components/Navbar';

const AppLayout = () => {
  const { isAuthorized } = useAppSelector(selectAuth);
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to={RoutesList.SIGN_IN} replace state={{ from: location }} />;
  }

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
};

export default AppLayout;
