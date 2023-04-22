import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

interface Props {
  getState: (state: boolean) => void;
  defaultState: boolean;
}

const Switch = ({ getState, defaultState }: Props) => {
  const [checked, setChecked] = useState(defaultState);

  useEffect(() => {
    getState(checked);
  }, [checked]);

  return (
    <span className={styles.switch}>
      <input
        onChange={() => setChecked((prevState) => !prevState)}
        checked={checked}
        id="switch"
        type="checkbox"
      />
      <label htmlFor="switch"></label>
    </span>
  );
};

export default Switch;
