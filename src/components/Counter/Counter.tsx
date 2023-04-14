import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  minValue: number;
  getValue: (value: number) => void;
}

const Counter = ({ minValue, getValue }: Props) => {
  const [value, setValue] = useState(minValue);

  const increase = () => setValue((prevState) => prevState + 1);
  const decrease = () =>
    setValue((prevState) => {
      if (prevState - 1 <= minValue) {
        return minValue;
      }

      return prevState - 1;
    });

  useEffect(() => {
    getValue(value);
  }, [value]);

  return (
    <div className={styles.counter}>
      <button onClick={decrease} className={styles.minus} />
      <span className={styles.number}>{value}</span>
      <button onClick={increase} className={styles.plus} />
    </div>
  );
};

export default Counter;
