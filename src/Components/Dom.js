import { useState } from "react";
import { getDistance, getRotate, point, setEleStyle } from "../utilize/Calc2D";

function Dom(props) {
  const { info } = props;
  const [style, setStyle] = useState({
    eleTop: info.y - info.h / 2 || 0,
    eleLeft: info.x - info.w / 2 || 0,
    eleWidth: info.w || 0,
    eleHeight: info.h || 0,
    eleRotate: info.r || 0,
    eleScale: info.s || 1,
  });
  const [touchData, setTouchData] = useState({});

  const handleElementTouchStart = (event) => {
    const touchList = event.touches;
    setTouchData({
      ...touchData,
      touchFocus: true,
      startA: point(touchList[0].pageX, touchList[0].pageY),
    });

    if (touchList?.length > 1) {
      setTouchData({
        ...touchData,
        startB: point(touchList[1].pageX, touchList[1].pageY),
        distanceLast: getDistance(touchData.startA, touchData.startB),
      });
    }
  };

  const handleElementTouchMove = (event) => {
    const touchList = event.touches;

    if (touchList?.length > 1) {
      const currentA = point(touchList[0].pageX, touchList[0].pageY);
      const currentB = point(touchList[1].pageX, touchList[1].pageY);
      setTouchData({
        ...touchData,
        distanceCurrent: getDistance(currentA, currentB),
      });

      const scale = touchData.distanceCurrent / touchData.distanceLast;

      const rotate = getRotate(
        currentA,
        currentB,
        touchData.startA,
        touchData.startB
      );
      setTouchData({
        ...touchData,
        scaleCurrent: touchData.scaleLast ? scale * touchData.scaleLast : scale,
        rotateCurrent: touchData.rotateLast
          ? rotate + touchData.rotateLast
          : rotate,
      });

      setStyle({
        ...style,
        eleRotate: touchData.rotateCurrent,
        eleScale: touchData.scaleCurrent,
      });
    } else {
      const diffX = touchList[0].pageX - touchData.startA.x;
      const diffY = touchList[0].pageY - touchData.startA.y;

      setStyle({
        ...style,
        eleLeft: style.eleLeft + diffX,
        eleTop: style.eleTop + diffY,
      });
      touchData.startA = point(touchList[0].pageX, touchList[0].pageY);
    }
  };

  const handleElementTouchEnd = (event) => {
    setTouchData({
      ...touchData,
      touchFocus: false,
      scaleLast: touchData.scaleCurrent,
      rotateLast: touchData.rotateCurrent,
    });
    props.parentCallBack(touchData.startA, info.id);
  };

  return (
    <>
      <div
        className="element"
        style={setEleStyle(style, info.id)}
        onTouchStart={(event) => handleElementTouchStart(event)}
        onTouchMove={(event) => handleElementTouchMove(event)}
        onTouchEnd={(event) => handleElementTouchEnd(event)}
      ></div>
    </>
  );
}

export default Dom;
