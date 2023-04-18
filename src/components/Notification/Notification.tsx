import React from 'react';
import styles from './styles.module.scss';
import callIcon from '../../assets/images/ic_call.png';
import timeIcon from '../../assets/images/ic_time.png';
import locationIcon from '../../assets/images/ic_map.png';
import defaultUser from '../../assets/images/user.png';

const Notification = () => {
  return (
    <li className={styles.notification}>
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
      <hr className={styles.divider} />
      <div className={styles.deliveryInfo}>
        <div className={styles.time}>
          <div className={styles.timeIcon}>
            <img src={timeIcon} alt="time" />
          </div>
          <div className={styles.timeInfo}>
            <h2 className={styles.timeInfoTitle}>Your Delivery Time</h2>
            <p className={styles.timeInfoContent}>60 minutes</p>
          </div>
        </div>
        <div className={styles.address}>
          <div className={styles.locationIcon}>
            <img src={locationIcon} alt="location" />
          </div>
          <div className={styles.addressInfo}>
            <h2 className={styles.addressInfoTitle}>Your Delivery Address</h2>
            <p className={styles.addressInfoContent}>Bla city</p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Notification;
