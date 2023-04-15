import { MouseEvent, useState } from 'react';

interface SwipeInput {
  onSwipedLeft: () => void;
  onSwipedRight: () => void;
}

interface SwipeOutput {
  onMouseDown: (e: MouseEvent) => void;
  onMouseMove: (e: MouseEvent) => void;
  onMouseUp: () => void;
}

const useMouseSwipe = ({ onSwipedLeft, onSwipedRight }: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const minSwipeDistance = 50;

  const onMouseDown = (event: MouseEvent) => {
    setTouchEnd(0);
    setTouchStart(event.pageX);
  };

  const onMouseMove = (event: MouseEvent) => setTouchEnd(event.pageX);

  const onMouseUp = () => {
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
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};

export default useMouseSwipe;
