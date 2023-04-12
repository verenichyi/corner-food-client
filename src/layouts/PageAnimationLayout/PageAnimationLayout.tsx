import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import animationStyles from './animation.module.scss';
import { MOUNT_ANIMATION_TIME } from '../../constants/animations';
import { useLocation } from 'react-router-dom';

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

const PageAnimationLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(true);
    return () => {
      setAnimationIn(false);
    };
  }, []);

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        in={animationIn}
        nodeRef={contentRef}
        timeout={MOUNT_ANIMATION_TIME}
        mountOnEnter
        unmountOnExit
        classNames={contentAnimation}
      >
        {(state) => <div ref={contentRef}>{children}</div>}
      </CSSTransition>
    </SwitchTransition>
  );
};

export default PageAnimationLayout;
