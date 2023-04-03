import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

const Container = ({ children }: PropsWithChildren) => {
  return <div className={styles.container}>{children}</div>;
};

export default Container;
