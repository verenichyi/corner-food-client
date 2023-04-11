import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';
import icons from '../../assets/icons.svg';

interface Props {
  item: {
    link: string;
    iconId: string;
  };
}

const NavbarItem = ({ item }: Props) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${styles.navItem} ${styles.navItem_active}` : styles.navItem
      }
      to={item.link}
    >
      <svg className={styles.icon}>
        <use xlinkHref={`${icons}#${item.iconId}`} />
      </svg>
    </NavLink>
  );
};

export default NavbarItem;
