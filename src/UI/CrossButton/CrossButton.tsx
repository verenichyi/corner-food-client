import React, { MouseEvent } from 'react';
import styles from './styles.module.scss';

interface Props {
  onClick: () => void;
}

const CrossButton = ({ onClick }: Props) => {
  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
    onClick();
  };

  return <button onClick={handleClick} className={styles.closeButton} />;
};

export default CrossButton;
