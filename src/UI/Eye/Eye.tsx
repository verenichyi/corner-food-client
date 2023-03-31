import React, { useState } from 'react';

import styles from './styles.module.scss';
import icons from '../../assets/icons.svg';

const Eye = ({ handleClick }: { handleClick: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleVisibility = () => {
    handleClick();
    setIsVisible(!isVisible);
  };

  return (
    <svg
      className={isVisible ? `${styles.eye} ${styles.eye_visible}` : styles.eye}
      onClick={handleVisibility}
    >
      <use xlinkHref={`${icons}#eye`} />
    </svg>
  );
};

export default Eye;
