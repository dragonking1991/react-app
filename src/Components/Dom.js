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
      const touchB = point(touchList[1].pageX, touchList[1].pageY);
      console.log(touchB);
      setTouchData({
        ...touchData,
        startB: touchB,
        distanceLast: getDistance(touchData.startA, touchB),
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

      const scaleCurrent = touchData.scaleLast
        ? scale * touchData.scaleLast
        : scale;

      const rotateCurrent = touchData.rotateLast
        ? rotate + touchData.rotateLast
        : rotate;

      setTouchData({
        ...touchData,
        scaleCurrent: scaleCurrent,
        rotateCurrent: rotateCurrent,
      });

      setStyle({
        ...style,
        eleRotate: rotateCurrent,
        eleScale: scaleCurrent,
      });
    } else {
      const diffX = touchList[0].pageX - touchData.startA.x;
      const diffY = touchList[0].pageY - touchData.startA.y;

      setStyle({
        ...style,
        eleLeft: style.eleLeft + diffX,
        eleTop: style.eleTop + diffY,
      });
      setTouchData({
        ...touchData,
        startA: point(touchList[0].pageX, touchList[0].pageY),
      });
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
