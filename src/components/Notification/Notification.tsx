import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import timeIcon from '../../assets/images/ic_time.png';
import locationIcon from '../../assets/images/ic_map.png';
import CourierInfo from '../CourierInfo';
import { OrderNotification } from '../../models/Notifications/order-notification';
import currency from 'currency.js';

interface Props {
  orderNotification: OrderNotification;
}

const Notification = ({ orderNotification }: Props) => {
  const orderItems = useMemo(
    () =>
      orderNotification.order.orderItems.map((orderItem) => (
        <div key={orderItem.product._id} className={styles.orderInfoItem}>
          <span className={styles.orderInfoItemKey}>{orderItem.product.title}:</span>
          <span className={styles.orderInfoItemValue}>
            x{orderItem.amount} <span>$</span>
            {currency(orderItem.product.price, { precision: 2, symbol: '' }).format()}
          </span>
        </div>
      )),
    [orderNotification],
  );

  return (
    <li className={styles.notification}>
      <CourierInfo />
      <hr className={styles.divider} />
      <div className={styles.orderInfo}>
        {orderItems}
        <div className={styles.orderInfoItem}>
          <span className={styles.orderInfoItemKey}>Total Price:</span>
          <span className={styles.orderInfoItemValue}>
            <span>$</span>
            {currency(orderNotification.order.totalPrice, { precision: 2, symbol: '' }).format()}
          </span>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.deliveryInfo}>
        <div className={styles.time}>
          <div className={styles.timeIcon}>
            <img src={timeIcon} alt="time" />
          </div>
          <div className={styles.timeInfo}>
            <h2 className={styles.timeInfoTitle}>Your Delivery Status</h2>
            <p className={styles.timeInfoContent}>{orderNotification.status}</p>
          </div>
        </div>
        <div className={styles.address}>
          <div className={styles.locationIcon}>
            <img src={locationIcon} alt="location" />
          </div>
          <div className={styles.addressInfo}>
            <h2 className={styles.addressInfoTitle}>Your Delivery Address</h2>
            <p className={styles.addressInfoContent}>
              {orderNotification.order.shippingAddress.city},{' '}
              {orderNotification.order.shippingAddress.address}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Notification;
