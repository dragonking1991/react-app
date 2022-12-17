import { getDistance, getRotate, point } from "./Calc2D";
export const handleTouchStart = (event, datas) => {
  const touchList = event.touches;
  datas.touchFocus = true;
  datas.startA = point(touchList[0].pageX, touchList[0].pageY);

  if (touchList?.length > 1) {
    datas.startB = point(touchList[1].pageX, touchList[1].pageY);
    datas.distanceLast = getDistance(datas.startA, datas.startB);
  }
};

export const handleTouchMove = (event, datas) => {
  const touchList = event.touches;

  if (touchList?.length > 1) {
    const currentA = point(touchList[0].pageX, touchList[0].pageY);
    const currentB = point(touchList[1].pageX, touchList[1].pageY);
    datas.distanceCurrent = getDistance(currentA, currentB);

    const scale = datas.distanceCurrent / datas.distanceLast;
    datas.scaleCurrent = datas.scaleLast ? scale * datas.scaleLast : scale;

    const rotate = getRotate(currentA, currentB, datas.startA, datas.startB);
    datas.rotateCurrent = datas.rotateLast ? rotate + datas.rotateLast : rotate;

    return {
      eleRotate: datas.rotateCurrent,
      eleScale: datas.scaleCurrent,
    };
  } else {
    const diffX = touchList[0].pageX - datas.startA.x;
    const diffY = touchList[0].pageY - datas.startA.y;

    datas.startA = point(touchList[0].pageX, touchList[0].pageY);
    return {
      eleLeft: datas.state.eleLeft + diffX,
      eleTop: datas.state.eleTop + diffY,
    };
  }
};

export const handleElementTouchEnd = (event, datas) => {
  datas.touchFocus = false;
  datas.scaleLast = datas.scaleCurrent;
  datas.rotateLast = datas.rotateCurrent;
};
