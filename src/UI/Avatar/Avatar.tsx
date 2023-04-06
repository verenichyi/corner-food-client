import React from 'react';
import styles from './styles.module.scss';

interface Props {
  avatar: string;
}

const Avatar = ({ avatar }: Props) => {
  return (
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
  );
};

export default Avatar;
