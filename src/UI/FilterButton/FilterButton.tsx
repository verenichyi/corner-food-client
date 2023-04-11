import React from 'react';
import styles from './styles.module.scss';

interface Props {
  handleClick: () => void;
}

const FilterButton = ({ handleClick }: Props) => {
  return (
    <button onClick={handleClick} className={styles.filterButton}>
      <div className={styles.filterIcon}>
        <span className={styles.filterIconItem} />
        <span className={styles.filterIconItem} />
        <span className={styles.filterIconItem} />
      </div>
    </button>
  );
};

export default FilterButton;
