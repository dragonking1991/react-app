import React from "react";
import "./ControlElements.scss";
import Element from "./Element";

class ControlElements extends React.Component {
  constructor(props) {
    super(props);
    this.warpperRef = React.createRef();
    this.state = {
      childs: [],
    };
  }

  componentDidMount() {
    this.wrapper = this.warpperRef.current;
    console.log("wrapper", this.wrapper);
    this.maxWidth = this.wrapper?.offsetWidth || 0;
    this.maxHeight = this.wrapper?.offsetHeight || 0;

    document.addEventListener("gesturestart", (e) => e.preventDefault());
  }

  componentWillUnmount() {
    document.removeEventListener("gesturestart", (e) => e.preventDefault());
  }

  render() {
    const createElement = () => {
      const infoChild = {
        name: "Sticker",
      };
      this.setState({
        childs: this.state.childs.concat(<Element info={infoChild} />),
      });
    };

    return (
      <>
        <div
          className="wrapper"
          ref={this.warpperRef}
          // onTouchStart={(event) => handleWrapperTouchStart(event)}
          // onTouchMove={(event) => handleWrapperTouchMove(event)}
          // onTouchEnd={(event) => handleWrapperTouchEnd(event)}
        >
          {this.state.childs}
          <button onClick={() => createElement()}>Create</button>
          <div className="delete-zone">Delete</div>
        </div>
      </>
    );
  }
}

export default ControlElements;
