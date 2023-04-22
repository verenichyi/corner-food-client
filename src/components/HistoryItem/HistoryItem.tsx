import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import { OrderModel } from '../../models/Order/order';
import CourierInfo from '../CourierInfo';
import currency from 'currency.js';

interface Props {
  order: OrderModel;
}

const HistoryItem = ({ order }: Props) => {
  const orderItems = useMemo(
    () =>
      order.orderItems.map((orderItem) => (
        <div key={orderItem.product._id} className={styles.orderInfoItem}>
          <span className={styles.orderInfoItemKey}>{orderItem.product.title}:</span>
          <span className={styles.orderInfoItemValue}>
            x{orderItem.amount} <span>$</span>
            {currency(orderItem.product.price, { precision: 2, symbol: '' }).format()}
          </span>
        </div>
      )),
    [order],
  );

  return (
    <li className={styles.item}>
      <CourierInfo />
      <hr className={styles.divider} />
      <div className={styles.orderInfo}>
        {orderItems}
        <div className={styles.orderInfoItem}>
          <span className={styles.orderInfoItemKey}>Total Price:</span>
          <span className={styles.orderInfoItemValue}>
            <span>$</span>
            {currency(order.totalPrice, { precision: 2, symbol: '' }).format()}
          </span>
        </div>
        <div className={styles.orderInfoItem}>
          <span className={styles.orderInfoItemKey}>Address:</span>
          <span className={styles.orderInfoItemValue}>
            {order.shippingAddress.city}, {order.shippingAddress.address}
          </span>
        </div>
      </div>
    </li>
  );
};

export default HistoryItem;
