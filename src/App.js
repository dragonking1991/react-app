import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./App.css";
import CallBackHook from "./Components/CallbackHook";

const expensiveFunction = (number) => {
  console.log("Start");
  const start = new Date();
  while (new Date() - start < 3000);
  console.log("End", new Date() - start, "ms");
  return number * number;
};

const App = () => {
  const [count, setCount] = useState(0);
  const [action, setAction] = useState("");
  const [scrollPos, setScrollPos] = useState(0);

  const number = useMemo(() => {
    return expensiveFunction(10);
  }, []);

  useEffect(() => {
    document.title = `Click log ${count}`;
    console.log("useEffect");
  }, [count]);

  useEffect(() => {
    action &&
      axios
        .get(`https://reqres.in/api/${action}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  }, [action]);

  const handleScroll = () => {
    setScrollPos(window.scrollY);
  };

  useEffect(() => {
    //componentDidMount
    document.addEventListener("scroll", handleScroll);

    //componentWillUnmount
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div className="App" style={{ height: "3000px" }}>
      <CallBackHook />
      <p>Number {number}</p>
      <p>You clicked {count}</p>
      <p style={{ position: "fixed", bottom: "20px" }}>{scrollPos}</p>
      <button onClick={() => setCount(count + 1)}>Click count</button>
      <button onClick={() => setAction("user")}>Click user</button>
      <button onClick={() => setAction("comment")}>Click comment</button>
    </div>
  );
};

export default App;
