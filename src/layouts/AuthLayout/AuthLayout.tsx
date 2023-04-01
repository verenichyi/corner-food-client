import React from 'react';
import { Navigate, NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './styles.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import RoutesList from '../../constants/routes';
import logo from '../../assets/images/logo.jpg';

const AuthLayout = () => {
  const { isAuthorized } = useAppSelector(selectAuth);
  const location = useLocation();

  if (isAuthorized) {
    const origin = location.state?.from?.pathname || RoutesList.Home;
    return <Navigate to={origin} replace state={{ from: location }} />;
  }

  return (
    <div className={styles.auth}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="logo" />
        </div>
        <h1 className={styles.title}>Corner Food</h1>
        <h2 className={styles.subtitle}>Delivery App</h2>
        <nav className={styles.nav}>
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? `${styles.navItem} ${styles.navItem_active}` : styles.navItem
            }
            to={RoutesList.SIGN_IN}
          >
            Login
          </NavLink>
          <NavLink
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? `${styles.navItem} ${styles.navItem_active}` : styles.navItem
            }
            to={RoutesList.SIGN_UP}
          >
            Signup
          </NavLink>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
