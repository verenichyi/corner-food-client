import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import animationStyles from './animation.module.scss';
import { MOUNT_ANIMATION_TIME } from '../../constants/animations';
import styles from './styles.module.scss';

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

interface Props {
  onClose: () => void;
  isOpened: boolean;
}

const OverlayingPopupAnimationLayout = ({
  children,
  onClose,
  isOpened,
}: PropsWithChildren<Props>) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpened);
  }, [isOpened]);

  return (
    <div className={styles.container} role="dialog">
      <CSSTransition
        in={animationIn}
        nodeRef={overlayRef}
        timeout={MOUNT_ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={overlayAnimation}
      >
        <div className={styles.overlay} role="button" tabIndex={0} onClick={onClose} />
      </CSSTransition>
      <CSSTransition
        in={animationIn}
        nodeRef={contentRef}
        timeout={MOUNT_ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </CSSTransition>
    </div>
  );
};

export default OverlayingPopupAnimationLayout;
