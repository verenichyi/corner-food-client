import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectOrders } from '../../redux/store/selectors';
import { getInactiveOrders } from '../../redux/asyncActions/orders';
import HistoryItem from '../../components/HistoryItem';
import styles from './styles.module.scss';
import Loader from '../../UI/Loader';

const History = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { inactiveOrders, isInactiveLoading } = useAppSelector(selectOrders);

  const historyItems = useMemo(
    () => inactiveOrders.map((order) => <HistoryItem key={order._id} order={order} />),
    [inactiveOrders],
  );

  useEffect(() => {
    dispatch(getInactiveOrders(user!._id));
  }, []);

  if (isInactiveLoading) {
    return <Loader />;
  }

  return historyItems.length ? (
    <ul className={styles.list}>{historyItems}</ul>
  ) : (
    <div className={styles.noOrdersInHistory}>No orders in history</div>
  );
};

export default History;
