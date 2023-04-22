import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectOrders } from '../../redux/store/selectors';
import { getInactiveOrders } from '../../redux/asyncActions/orders';
import HistoryItem from '../../components/HistoryItem';
import styles from './styles.module.scss';

const History = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { inactiveOrders } = useAppSelector(selectOrders);

  const historyItems = useMemo(
    () => inactiveOrders.map((order) => <HistoryItem key={order._id} order={order} />),
    [inactiveOrders],
  );

  useEffect(() => {
    dispatch(getInactiveOrders(user!._id));
  }, []);

  return <ul className={styles.list}>{historyItems}</ul>;
};

export default History;
