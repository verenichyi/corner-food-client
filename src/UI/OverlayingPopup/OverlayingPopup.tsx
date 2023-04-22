import React, { PropsWithChildren } from 'react';
import Portal from '../Portal';
import { useMount } from '../../hooks/useMount';
import OverlayingPopupAnimationLayout from '../../layouts/OverlayingPopupAnimationLayout';

interface Props {
  isOpened: boolean;
  onClose: () => void;
}

const OverlayingPopup = ({ children, isOpened, onClose }: PropsWithChildren<Props>) => {
  const { mounted } = useMount({ opened: isOpened });

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <OverlayingPopupAnimationLayout isOpened={isOpened} onClose={onClose}>
        {children}
      </OverlayingPopupAnimationLayout>
    </Portal>
  );
};

export default OverlayingPopup;
