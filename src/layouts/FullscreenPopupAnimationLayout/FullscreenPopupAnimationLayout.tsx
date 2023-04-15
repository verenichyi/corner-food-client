import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import animationStyles from './animation.module.scss';
import { MOUNT_ANIMATION_TIME } from '../../constants/animations';

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

interface Props {
  isOpened: boolean;
}

const FullscreenPopupAnimationLayout = ({ children, isOpened }: PropsWithChildren<Props>) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(isOpened);
  }, [isOpened]);

  return (
    <CSSTransition
      in={animationIn}
      nodeRef={contentRef}
      timeout={MOUNT_ANIMATION_TIME}
      mountOnEnter
      unmountOnExit
      classNames={contentAnimation}
    >
      <div ref={contentRef}>{children}</div>
    </CSSTransition>
  );
};

export default FullscreenPopupAnimationLayout;
