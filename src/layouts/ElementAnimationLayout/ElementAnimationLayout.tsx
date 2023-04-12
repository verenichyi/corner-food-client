import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import animationStyles from './animation.module.scss';
import { MOUNT_ANIMATION_TIME } from '../../constants/animations';

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

interface Props {
  isActive: boolean;
}

const ElementAnimationLayout = ({ children, isActive }: PropsWithChildren<Props>) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      in={isActive}
      nodeRef={contentRef}
      timeout={MOUNT_ANIMATION_TIME}
      mountOnEnter
      unmountOnExit
      classNames={contentAnimation}
    >
      <div style={{ width: '100%' }} ref={contentRef}>
        {children}
      </div>
    </CSSTransition>
  );
};

export default ElementAnimationLayout;
