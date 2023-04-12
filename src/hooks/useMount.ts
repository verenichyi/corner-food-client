import { useEffect, useState } from 'react';
import { MOUNT_ANIMATION_TIME } from '../constants/animations';

export const useMount = ({ opened }: { opened: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, MOUNT_ANIMATION_TIME);
    }
  }, [opened]);

  return { mounted };
};
