import { TouchEvent, useState } from 'react';

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: () => void;
}

const useSwipe = ({ onSwipedLeft, onSwipedRight }: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onTouchStart = (event: TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(event.targetTouches[0].clientX);
  };

  const onTouchMove = (event: TouchEvent) => setTouchEnd(event.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      onSwipedLeft();
    }
    if (isRightSwipe) {
      onSwipedRight();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};

export default useSwipe;
