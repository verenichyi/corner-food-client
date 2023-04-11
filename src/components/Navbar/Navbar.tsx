import React from 'react';
import { appNavBarItems } from '../../constants/routes';
import styles from './styles.module.scss';
import cart from '../../assets/images/cart.png';
import NavbarItem from '../NavbarItem';

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.left}>
            {appNavBarItems.left.map((item) => (
              <NavbarItem key={item.link} item={item} />
            ))}
          </div>
          <div className={styles.divider}></div>
          <div className={styles.right}>
            {appNavBarItems.right.map((item) => (
              <NavbarItem key={item.link} item={item} />
            ))}
          </div>
          <div className={styles.cart}>
            <div className={styles.circle}>
              <button className={styles.cartButton}>
                <img src={cart} alt="cart" />
              </button>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
