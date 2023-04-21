import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectOrders } from '../../redux/store/selectors';
import { getInactiveOrders } from '../../redux/asyncActions/orders';
import styles from './styles.module.scss';

const History = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { inactiveOrders } = useAppSelector(selectOrders);
  console.log(inactiveOrders);
  useEffect(() => {
    dispatch(getInactiveOrders(user!._id));
  }, []);

  return (
    <div>
      <h1>History</h1>
    </div>
  );
};

export default History;
