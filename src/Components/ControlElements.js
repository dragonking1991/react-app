import React from "react";
import "./ControlElements.scss";
import Element from "./Element";

class ControlElements extends React.Component {
  constructor(props) {
    super(props);
    this.warpperRef = React.createRef(null);
    this.trashRef = React.createRef(null);
    this.childId = React.createRef(0);
    this.state = {
      childs: [],
    };
  }

  componentDidMount() {
    document.addEventListener("gesturestart", (e) => e.preventDefault());
  }

  componentWillUnmount() {
    document.removeEventListener("gesturestart", (e) => e.preventDefault());
  }

  render() {
    const createElement = () => {
      this.childId.current += 1;
      this.maxWidth = this.warpperRef.current?.offsetWidth || 0;
      this.maxHeight = this.warpperRef.current?.offsetHeight || 0;

      const infoChild = {
        id: this.childId.current,
        name: "Sticker",
        x: this.maxWidth / 2,
        y: this.maxHeight / 2,
        w: 150,
        h: 150,
      };

      this.setState({
        childs: this.state.childs.concat(
          <Element
            key={infoChild.id}
            info={infoChild}
            parentCallBack={checkElement}
          />
        ),
      });
    };

    const checkElement = ( point, id) => {
      const trashTop = this.trashRef.current?.offsetTop || 0;
      const trashLeft = this.trashRef.current?.offsetLeft || 0;
      const trashWidth = this.trashRef.current?.offsetWidth || 0;
      const trashHeight = this.trashRef.current?.offsetHeight || 0;

      const checkIntentRemoveElement =
        point.x < trashLeft ||
        point.y < trashTop ||
        point.x > trashLeft + trashWidth ||
        point.y > trashTop + trashHeight;

      !checkIntentRemoveElement &&
        this.setState({
          childs: this.state.childs.filter(
            (child) => parseInt(child.key) !== id
          ),
        });
    };

    return (
      <>
        <div className="wrapper" ref={this.warpperRef}>
          {this.state.childs}
          <button onClick={() => createElement()}>Create</button>
          <div className="destroy" ref={this.trashRef}>
            Trash
          </div>
        </div>
        {JSON.stringify(this.state.childs)}
      </>
    );
  }
}

export default ControlElements;
