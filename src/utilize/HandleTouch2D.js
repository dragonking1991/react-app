import { degRotate, distance, point } from "./Calc2D";

export const handleTouchMove = (
  event,
  {
    distanceFirstTouchs,
    firstA,
    firstB,
    touchElement,
    elementWidth,
    elementHeight,
  }
) => {
  const touchList = event.touches;

  if (touchList?.length === 2) {
    const touchA = point(touchList[0].clientX, touchList[0].clientY);
    const touchB = point(touchList[1].clientX, touchList[1].clientY);
    const distanceTouchs = distance(touchA, touchB);
    const deg = degRotate(touchA, touchB, firstA, firstB);

    const ratio = parseFloat((distanceTouchs / distanceFirstTouchs).toFixed(2));

    return {
      eleTransform: `scale(${ratio}) rotate(${deg}deg)`,
    };
  }

  // change Element position
  if (touchElement && touchList?.length === 1) {
    return {
      eleTop: touchList[0].clientY - elementHeight / 2,
      eleLeft: touchList[0].clientX - elementWidth / 2,
    };
  }
};

export const handleTouchStart = (
  event,
  { element, touchElement, firstA, firstB, distanceFirstTouchs }
) => {
  if (event.target === element) {
    touchElement = true;
  }

  const touchList = event.touches;
  if (touchList?.length === 2) {
    firstA = point(touchList[0].clientX, touchList[0].clientY);
    firstB = point(touchList[1].clientX, touchList[1].clientY);
    distanceFirstTouchs = distance(firstA, firstB);
  }
};