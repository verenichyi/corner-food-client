import React from 'react';
import { NavLink } from 'react-router-dom';
import { authNavBarItems } from '../../constants/routes';
import styles from './styles.module.scss';
import logo from '../../assets/images/logo.jpg';

const AuthHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <h1 className={styles.title}>Corner Food</h1>
      <h2 className={styles.subtitle}>Delivery App</h2>
      <nav className={styles.nav}>
        {authNavBarItems.map((item) => (
          <NavLink
            key={item.link}
            className={({ isActive }: { isActive: boolean }) =>
              isActive ? `${styles.navItem} ${styles.navItem_active}` : styles.navItem
            }
            to={item.link}
          >
            {item.content}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default AuthHeader;
