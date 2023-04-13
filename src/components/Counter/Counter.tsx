import React, { useState } from 'react';
import styles from './styles.module.scss';

const Counter = () => {
  const [value, setValue] = useState(1);

  const increase = () => setValue((prevState) => prevState + 1);
  const decrease = () =>
    setValue((prevState) => {
      if (prevState - 1 <= 1) {
        return 1;
      }

      return prevState - 1;
    });

  return (
    <div className={styles.counter}>
      <button onClick={decrease} className={styles.minus} />
      <span className={styles.number}>{value}</span>
      <button onClick={increase} className={styles.plus} />
    </div>
  );
};

export default Counter;
