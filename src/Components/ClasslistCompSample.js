import React from "react";

class ClasslistCompSample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      increaseCounter: 0,
      text: "",
    };
  }

  handleClick(e) {
    this.setState({ counter: this.state.counter + 1 });
  }

  componentDidMount() {
    // this.time = setInterval(() => {
    //   this.setState({ increaseCounter: ++this.state.increaseCounter})
    // },1000)
  }

  componentDidUpdate() {}
  componentWillUnmount() {
    clearInterval(this.time);
  }

  render() {
    // let text = "";
    // if (this.state.counter === 2) {
    //   text = "kudang";
    // }
    // if (this.state.counter === 2) {
    //   text = "kudang";
    // }

    // if (this.state.counter !== 3) {
    //   return (
    //     <>
    //       {
    //         if(this.state.counter === 1) {
    //           <p>click {this.state.counter}</p>
    //         }
    //       }

    //       <p>click {this.state.increaseCounter}</p>
    //       <button onClick={(e) => this.handleClick(e)}>Click</button>
    //       <p>{text}</p>
    //     </>
    //   );
    // } else {
    //   return <p>Kudang that tuyet</p>;
    // }

    const f = () => {
      if (this.state.text === 0) return <>so 0 ne</>;
      else
        return (
          <>
            {this.state.text === 1 ? "so 1 ne" : <>so {this.state.text} ne</>}
          </>
        );
    };
    return <>{f()}</>;
  }
}

export default ClasslistCompSample;
