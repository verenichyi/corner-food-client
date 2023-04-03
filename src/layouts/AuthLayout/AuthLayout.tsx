import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import RoutesList from '../../constants/routes';
import Container from '../../UI/Container';
import AuthHeader from '../../components/AuthHeader';

const AuthLayout = () => {
  const { isAuthorized } = useAppSelector(selectAuth);
  const location = useLocation();

  if (isAuthorized) {
    const origin = location.state?.from?.pathname || RoutesList.Home;
    return <Navigate to={origin} replace state={{ from: location }} />;
  }

  return (
    <div className={styles.auth}>
      <Container>
        <AuthHeader />
        <main className={styles.main}>
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default AuthLayout;
