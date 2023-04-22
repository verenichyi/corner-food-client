import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
import ProfileHeader from '../../components/ProfileHeader';

const ProfileLayout = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <ProfileHeader />
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
