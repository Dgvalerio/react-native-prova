/* eslint-disable import/prefer-default-export,@typescript-eslint/no-explicit-any */
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const useSwipe = (
  onSwipeLeft?: () => void,
  onSwipeRight?: () => void,
  rangeOffset = 4
): { onTouchStart: (e: any) => void; onTouchEnd: (e: any) => void } => {
  let firstTouch = 0;

  if (!onSwipeRight || !onSwipeLeft)
    return { onTouchStart: () => null, onTouchEnd: () => null };

  const onTouchStart = (e: any) => {
    firstTouch = e.nativeEvent.pageX;
  };

  const onTouchEnd = (e: any) => {
    const positionX = e.nativeEvent.pageX;
    const range = windowWidth / rangeOffset;

    if (positionX - firstTouch > range) onSwipeRight();
    else if (firstTouch - positionX > range) onSwipeLeft();
  };

  return { onTouchStart, onTouchEnd };
};
