import React from "react";
import { getRotate, getDistance, point, setEleStyle } from "../utilize/Calc2D";

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.pointer = React.createRef();
    this.state = {
      eleTop: this.props.info.y - this.props.info.h / 2 || 0,
      eleLeft: this.props.info.x - this.props.info.w / 2 || 0,
      eleWidth: this.props.info.w || 0,
      eleHeight: this.props.info.h || 0,
      eleRotate: this.props.info.r || 0,
      eleScale: this.props.info.s || 1,
    };
  }

  render() {
    const handleElementTouchStart = (event) => {
      const touchList = event.touches;
      this.touchFocus = true;
      this.startA = point(touchList[0].pageX, touchList[0].pageY);

      if (touchList?.length > 1) {
        this.startB = point(touchList[1].pageX, touchList[1].pageY);
        this.distanceLast = getDistance(this.startA, this.startB);
      }
    };

    const handleElementTouchMove = (event) => {
      const touchList = event.touches;

      if (touchList?.length > 1) {
        const currentA = point(touchList[0].pageX, touchList[0].pageY);
        const currentB = point(touchList[1].pageX, touchList[1].pageY);
        this.distanceCurrent = getDistance(currentA, currentB);

        const scale = this.distanceCurrent / this.distanceLast;
        this.scaleCurrent = this.scaleLast ? scale * this.scaleLast : scale;

        const rotate = getRotate(currentA, currentB, this.startA, this.startB);
        this.rotateCurrent = this.rotateLast
          ? rotate + this.rotateLast
          : rotate;

        this.setState({
          eleRotate: this.rotateCurrent,
          eleScale: this.scaleCurrent,
        });
      } else {
        const diffX = touchList[0].pageX - this.startA.x;
        const diffY = touchList[0].pageY - this.startA.y;

        this.setState({
          eleLeft: this.state.eleLeft + diffX,
          eleTop: this.state.eleTop + diffY,
        });
        this.startA = point(touchList[0].pageX, touchList[0].pageY);
      }
    };

    const handleElementTouchEnd = (event) => {
      this.touchFocus = false;
      this.scaleLast = this.scaleCurrent;
      this.rotateLast = this.rotateCurrent;
      this.props.parentCallBack(this.startA, this.props.info.id);
    };

    return (
      <>
        <div
          className="element"
          style={setEleStyle(this.state, this.props.info.id)}
          onTouchStart={(event) => handleElementTouchStart(event)}
          onTouchMove={(event) => handleElementTouchMove(event)}
          onTouchEnd={(event) => handleElementTouchEnd(event)}
        >
        </div>
      </>
    );
  }
}

export default Element;
