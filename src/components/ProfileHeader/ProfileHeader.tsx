import React from 'react';
import { NavLink } from 'react-router-dom';
import { profileNavBarItems } from '../../constants/routes';
import styles from './styles.module.scss';
import { pageTitles } from '../../constants/page-titles';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import userAvatar from '../../assets/images/user.png';
import Avatar from '../../UI/Avatar';

const ProfileHeader = () => {
  const { user } = useAppSelector(selectAuth);
  const avatar = user && user.profileImage ? user.profileImage : userAvatar;
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{pageTitles.profile}</h1>
      <div className={styles.user}>
        <div className={styles.avatar}>
          <Avatar avatar={avatar} />
        </div>
        <div className={styles.userInfo}>
          <div className={styles.username}>{user!.username}</div>
          <div className={styles.email}>{user!.email}</div>
          <div className={styles.id}>User ID : {user!._id}</div>
        </div>
      </div>
      <nav className={styles.nav}>
        {profileNavBarItems.map((item) => (
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

export default ProfileHeader;
