import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import styles from './style.module.scss';
import icons from '../../assets/icons.svg';

interface Props {
  isShown: boolean;
  hide: () => void;
  modalContent: JSX.Element;
}

const Modal = ({ isShown, hide, modalContent }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isShown]);

  useOnClickOutside(ref, hide);

  const modal = (
    <div className={styles.backdrop}>
      <div ref={ref} className={styles.modal}>
        {modalContent}
        <svg className={styles.closeButton} onClick={hide} data-testid={'closeBtn'}>
          <use xlinkHref={`${icons}#cross`} />
        </svg>
      </div>
    </div>
  );

  return isShown
    ? ReactDOM.createPortal(modal, document.getElementById('modal') as HTMLDivElement)
    : null;
};

export default Modal;
