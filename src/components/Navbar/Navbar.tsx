import React from 'react';
import { appNavBarItems } from '../../constants/routes';
import styles from './styles.module.scss';
import cart from '../../assets/images/cart.png';
import NavbarItem from '../NavbarItem';
import FullscreenPopup from '../../UI/FullscreenPopup';
import FullscreenPopupAnimationLayout from '../../layouts/FullscreenPopupAnimationLayout';
import useIsActive from '../../hooks/useIsActive';

const Navbar = () => {
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
                <img src={cart} alt="cart" />
              </button>
            </div>
          </div>
        </nav>
      </div>
      <FullscreenPopup isOpened={isOpened}>
        <FullscreenPopupAnimationLayout isOpened={isOpened}>
          <div>cart</div>
        </FullscreenPopupAnimationLayout>
      </FullscreenPopup>
    </div>
  );
};

export default Navbar;
