import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import Portal from '../Portal';
import { useMount } from '../../hooks/useMount';

interface Props {
  isOpened: boolean;
}

const FullscreenPopup = ({ children, isOpened }: PropsWithChildren<Props>) => {
  const { mounted } = useMount({ opened: isOpened });

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <div className={styles.container}>{children}</div>
    </Portal>
  );
};

export default FullscreenPopup;
