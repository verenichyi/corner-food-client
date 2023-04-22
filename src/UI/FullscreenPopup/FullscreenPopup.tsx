import React, { PropsWithChildren } from 'react';
import Portal from '../Portal';
import { useMount } from '../../hooks/useMount';
import FullscreenPopupAnimationLayout from '../../layouts/FullscreenPopupAnimationLayout';

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
      <FullscreenPopupAnimationLayout isOpened={isOpened}>
        {children}
      </FullscreenPopupAnimationLayout>
    </Portal>
  );
};

export default FullscreenPopup;
