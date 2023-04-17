import React from 'react';
import styles from './styles.module.scss';
import { pageTitles } from '../../constants/page-titles';
import Notification from '../Notification';

const NotificationsPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{pageTitles.notification}</h1>
        <ul className={styles.list}>
          <Notification />
        </ul>
      </div>
    </div>
  );
};

export default NotificationsPage;
