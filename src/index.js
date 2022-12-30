import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.scss";
import App from "./App";
import store from "./Components/ReduxStore/store";
import { Provider } from "react-redux";
// import ClasslistComp from './Components/ClasslistCompSample';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <Router>
        <div className="w-full">
          <App />
        </div>
      </Router>
    </Provider>
  </>
  // <React.StrictMode>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
