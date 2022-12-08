import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import "./index.css";
// import App from './App';
// import ClasslistComp from './Components/ClasslistCompSample';
import ControlElements from "./Components/ControlElements";
import ClasslistCompSample from "./Components/ClasslistCompSample";
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <App /> */}
    {/* <ClasslistComp /> */}

    <ControlElements />
  </>
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
