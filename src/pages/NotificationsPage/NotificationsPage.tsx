import React, { useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { pageTitles } from '../../constants/page-titles';
import Notification from '../../components/Notification';
import { io } from 'socket.io-client';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectOrders } from '../../redux/store/selectors';
import { WebSocketEvents } from '../../constants/WebSocketEvents';
import { OrderNotification } from '../../models/Notifications/order-notification';
import { ordersActions } from '../../redux/slices/orders';

const NotificationsPage = () => {
  const socket = io(process.env.REACT_APP_API_URL!);
  const dispatch = useAppDispatch();
  const { setActiveOrders } = ordersActions;
  const { user } = useAppSelector(selectAuth);
  const { activeOrders } = useAppSelector(selectOrders);

  const notifications = useMemo(
    () =>
      activeOrders.map((orderNotification) => (
        <Notification key={orderNotification.order._id} orderNotification={orderNotification} />
      )),
    [activeOrders],
  );

  useEffect(() => {
    socket.emit(
      WebSocketEvents.FindUserActiveOrders,
      { userId: user!._id },
      (response: OrderNotification[]) => {
        dispatch(setActiveOrders(response));
      },
    );

    socket.on(WebSocketEvents.UpdateUserActiveOrders, (response: OrderNotification[]) => {
      dispatch(setActiveOrders(response));
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{pageTitles.notification}</h1>
        {notifications.length > 0 ? (
          <ul className={styles.list}>{notifications}</ul>
        ) : (
          <div className={styles.noActiveOrdersText}>No active orders</div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
