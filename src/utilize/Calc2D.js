export const point = (x, y) => {
  return { x: x, y: y };
};

export const getVector = (pointLast, pointCurrent) => {
  return {
    x: pointCurrent.x -  pointLast.x,
    y: pointCurrent.y -  pointLast.y
  }
}

export const getPointByVector = (vector, point) => {
  const newPoint = {
    x: vector.x + point.x,
    y: vector.y + point.y
  }
  return newPoint
};

export const getRotate = (lastA, lastB, currentA, currentB) => {
  const diffAx = lastB.x - lastA.x;
  const diffAy = lastB.y - lastA.y;
  const diffBx = currentB.x - currentA.x;
  const diffBy = currentB.y - currentA.y;
  const angle = Math.atan2(
    diffAx * diffBy - diffAy * diffBx,
    diffAx * diffBx + diffAy * diffBy
  );
  const toDeg = -angle * (180 / Math.PI);
  return toDeg;
};

export const getDistance = (pointA, pointB) => {
  const diffX = pointA.x - pointB.x;
  const diffY = pointA.y - pointB.y;
  return Math.sqrt(diffX * diffX + diffY * diffY);
}

export const setEleStyle = (el, id) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return {
    position: "absolute",
    top: `${el.eleTop}px`,
    left: `${el.eleLeft}px`,
    width: `${el.eleWidth}px`,
    height: `${el.eleHeight}px`,
    transform: `scale(${el.eleScale}) rotate(${el.eleRotate}deg)`,
    background: `#${randomColor}`,
    zIndex: id + 10,
  };
};