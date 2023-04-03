import { useState } from 'react';

type ReturnType = [boolean, () => void];

const useIsActive = (): ReturnType => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggle = () => setIsActive(!isActive);
  return [isActive, toggle];
};

export default useIsActive;
