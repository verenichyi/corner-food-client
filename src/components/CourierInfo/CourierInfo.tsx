import React from 'react';
import styles from './styles.module.scss';
import defaultUser from '../../assets/images/user.png';
import callIcon from '../../assets/images/ic_call.png';

const CourierInfo = () => {
  return (
    <div className={styles.courierInfo}>
      <div className={styles.photo}>
        <img src={defaultUser} alt="photo" />
      </div>
      <div className={styles.mainInfo}>
        <h2 className={styles.name}>Budi Sanjaya</h2>
        <h3 className={styles.ID}>ID: 7856456459</h3>
        <h4 className={styles.role}>Food courier</h4>
      </div>
      <a className={styles.callButton} href="tel:" role={'button'}>
        <img src={callIcon} alt="tel" />
      </a>
    </div>
  );
};

export default CourierInfo;
