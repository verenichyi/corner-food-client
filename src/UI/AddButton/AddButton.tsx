import React, { MouseEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  onClick: () => void;
}

const AddButton = ({ onClick }: Props) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    onClick();
  };

  return (
    <div onClick={handleClick} className={styles.circle}>
      <button className={styles.button} />
    </div>
  );
};

export default AddButton;
