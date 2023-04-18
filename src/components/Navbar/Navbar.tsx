import React from 'react';
import { appNavBarItems } from '../../constants/routes';
import styles from './styles.module.scss';
import cartImage from '../../assets/images/cart.png';
import NavbarItem from '../NavbarItem';
import useIsActive from '../../hooks/useIsActive';
import { useAppSelector } from '../../hooks/redux';
import { selectCart } from '../../redux/store/selectors';
import Cart from '../Cart';
import FullscreenPopup from '../../UI/FullscreenPopup';

const Navbar = () => {
  const { cart } = useAppSelector(selectCart);
  const [isOpened, toggleIsOpened] = useIsActive();

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
          <div onClick={toggleIsOpened} className={styles.cart}>
            <div className={styles.circle}>
              <button className={styles.cartButton}>
                <img src={cartImage} alt="cart" />
              </button>
            </div>
            {cart.length > 0 && <div className={styles.productsAmount}>{cart.length}</div>}
          </div>
        </nav>
      </div>
      <FullscreenPopup isOpened={isOpened}>
        <Cart onClose={toggleIsOpened} />
      </FullscreenPopup>
    </div>
  );
};

export default Navbar;
