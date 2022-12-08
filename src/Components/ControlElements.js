import React from "react";
import "./ControlElements.css";

const point = (x, y) => {
  return { x: x, y: y };
};

const setEleStyle = (el) => {
  return {
    position: "absolute",
    top: `${el.eleTop}px`,
    left: `${el.eleLeft}px`,
    width: `${el.eleWidth}px`,
    height: `${el.eleHeight}px`,
    transform: `${el.eleTransform}`,
  };
};

const degRotate = (a1, a2, b1, b2) => {
  const diffAx = a2.x - a1.x;
  const diffAy = a2.y - a1.y;
  const diffBx = b2.x - b1.x;
  const diffBy = b2.y - b1.y;
  const angle = Math.atan2(
    diffAx * diffBy - diffAy * diffBx,
    diffAx * diffBx + diffAy * diffBy
  );
  return -angle * (180 / Math.PI);
};

const distance = (a, b) => {
  const diffX = a.x - b.x;
  const diffY = a.y - b.y;
  return ~~Math.sqrt(diffX * diffX + diffY * diffY);
};

class ControlElements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eleTop: 0,
      eleLeft: 0,
      eleWidth: 150,
      eleHeight: 150,
      eleTransform: "none",
    };
  }

  componentDidMount() {
    this.wrapper = document.querySelector(".wrapper");
    this.element = document.querySelector(".element");
    this.maxWidth = this.wrapper.offsetWidth || 0;
    this.maxHeight = this.wrapper.offsetHeight || 0;
    this.elementWidth = this.element.offsetWidth || 0;
    this.elementHeight = this.element.offsetHeight || 0;
    this.touchElement = false;

    this.setState({
      eleTop: this.maxHeight / 2 - this.elementHeight / 2,
      eleLeft: this.maxWidth / 2 - this.elementWidth / 2,
      eleWidth: this.elementWidth,
      eleHeight: this.elementHeight,
    });

    document.addEventListener("gesturestart", function (e) {
      e.preventDefault();
    });
  }

  componentDidUpdate() {
    // console.log('update',this.state)
  }

  componentWillUnmount() {
    document.removeEventListener("gesturestart", function (e) {
      e.preventDefault();
    });
  }

  render() {
    const handleWrapperTouchMove = (event) => {
      const touchList = event.touches;

      if (touchList?.length === 2) {
        const touchA = point(touchList[0].clientX, touchList[0].clientY);
        const touchB = point(touchList[1].clientX, touchList[1].clientY);
        const distanceTouchs = distance(touchA, touchB);
        const deg = degRotate(touchA, touchB, this.firstA, this.firstB);

        const ratio = parseFloat(
          (distanceTouchs / this.distanceFirstTouchs).toFixed(2)
        );

        this.setState({
          eleTransform: `scale(${ratio}) rotate(${deg}deg)`,
        });
      }

      // const moveEleTop = touchList[0].clientY;
      // const moveEleTop = touchList[0].clientY;

      // change Element position
      if (this.touchElement && touchList?.length === 1) {
        this.setState({
          eleTop: touchList[0].clientY - this.elementHeight / 2,
          eleLeft: touchList[0].clientX - this.elementWidth / 2,
        });
      }
    };

    const handleWrapperTouchStart = (event) => {
      if (event.target === this.element) {
        this.touchElement = true;
      }

      const touchList = event.touches;
      if (touchList?.length === 2) {
        this.firstA = point(touchList[0].clientX, touchList[0].clientY);
        this.firstB = point(touchList[1].clientX, touchList[1].clientY);
        this.distanceFirstTouchs = distance(this.firstA, this.firstB);
      }
    };

    const handleWrapperTouchEnd = (event) => {
      this.touchElement = false;
    };

    const styleElement = {
      eleTop: this.state.eleTop,
      eleLeft: this.state.eleLeft,
      eleWidth: this.state.eleWidth,
      eleHeight: this.state.eleHeight,
      eleTransform: this.state.eleTransform,
    };

    return (
      <>
        <div
          className="wrapper"
          onTouchStart={(event) => handleWrapperTouchStart(event)}
          onTouchMove={(event) => handleWrapperTouchMove(event)}
          onTouchEnd={(event) => handleWrapperTouchEnd(event)}
          // onMouseDown={(event) => handleWrapperTouchStart(event)}
          // onMouseMove={(event) => handleWrapperTouchMove(event)}
          // onMouseLeave={(event) => handleWrapperTouchEnd(event)}
        >
          <div className="element" style={setEleStyle(styleElement)}></div>
        </div>
      </>
    );
  }
}

export default ControlElements;
