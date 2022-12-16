import React from "react";
import { setEleStyle } from "../utilize/Calc2D";

class Element extends React.Component {
  constructor(props) {
    super(props);
    this.elementRef = React.createRef();
    this.state = {
      eleTop: 200,
      eleLeft: 200,
      eleWidth: 150,
      eleHeight: 150,
      eleTransform: "none",
    };
  }

  componentDidMount() {
    this.element = this.elementRef.current;
    this.elementWidth = this.element?.offsetWidth || 0;
    this.elementHeight = this.element?.offsetHeight || 0;

    this.setState({
      eleTop: this.maxHeight / 2 - this.elementHeight / 2,
      eleLeft: this.maxWidth / 2 - this.elementWidth / 2,
    });
  }
  render() {
    const styleElement = {
      eleTop: this.state.eleTop,
      eleLeft: this.state.eleLeft,
      eleWidth: this.state.eleWidth,
      eleHeight: this.state.eleHeight,
      eleTransform: this.state.eleTransform,
    };

    const handleElementTouchMove = (event) => {};

    const handleElementTouchStart = (event) => {};

    const handleElementTouchEnd = (event) => {};

    return (
      <>
        <div
          className="element"
          ref={this.elementRef}
          style={setEleStyle(styleElement)}
          onTouchStart={(event) => handleElementTouchStart(event)}
          onTouchMove={(event) => handleElementTouchMove(event)}
          onTouchEnd={(event) => handleElementTouchEnd(event)}
        >
          <span>{this.props.info.name}</span>
        </div>
      </>
    );
  }
}

export default Element;
