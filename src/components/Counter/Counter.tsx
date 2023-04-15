import React, { useEffect, useState, MouseEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  minValue: number;
  getValue: (value: number) => void;
  initialValue?: number;
}

const Counter = ({ minValue, getValue, initialValue }: Props) => {
  const [value, setValue] = useState(initialValue || minValue);

  const increase = (event: MouseEvent) => {
    event.stopPropagation();
    setValue((prevState) => prevState + 1);
  };
  const decrease = (event: MouseEvent) => {
    event.stopPropagation();
    setValue((prevState) => {
      if (prevState - 1 <= minValue) {
        return minValue;
      }

      return prevState - 1;
    });
  };

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
