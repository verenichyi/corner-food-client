import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';

interface Props {
  inverted: boolean;
  padding: string;
}

const Button = ({ children, inverted, padding }: PropsWithChildren<Props>) => (
  <button style={{ padding }} className={inverted ? styles.invertedButton : styles.button}>
    {children}
  </button>
);

export default Button;
