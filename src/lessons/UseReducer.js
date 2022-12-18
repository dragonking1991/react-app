import axios from "axios";
import { useReducer } from "react";

const reducerCounter = (state, action) => {
  switch (action) {
    case "INCREASE":
      return state + 1;
    case "DECREASE":
      return state - 1;
    case "RESET":
      return 0;
    default:
      return state;
  }
};

const initStateApi = {
  loading: false,
  data: [],
  error: null,
};

const reducerCallApi = (state, action) => {
  switch (action.type) {
    case "SEND_API":
      return {
        ...state,
        loading: true,
      };
    case "GET_API_SUCCESS":
      return {
        ...state,
        loading: false,
        data: action.data,
      };
    case "ERR_FALLBACK":
      return {
        ...state,
        loading: false,
        data: [],
        error: action.data,
      };
    default:
      return initStateApi;
  }
};

function ExcuteReducer() {
  const [count, dispatch] = useReducer(reducerCounter, 0);
  const [api, apiDispatch] = useReducer(reducerCallApi, initStateApi);

  const callAPI = () => {
    console.log("callAPI");
    apiDispatch({ type: "SEND_API" });
    axios
      .get("https://reqres.in/api/users")
      .then((res) =>
        apiDispatch({ type: "GET_API_SUCCESS", data: res.data })
      )
      .catch((err) => apiDispatch({ type: "ERR_FALLBACK", data: err }));
  };

  return (
    <>
      <p>{api.loading && "loading..."}</p>
      <p>{JSON.stringify(api.data)}</p>
      <button onClick={callAPI}>Call API</button>
      <p>Count: {count}</p>
      <button onClick={() => dispatch("INCREASE")}>Increase</button>
      <button onClick={() => dispatch("DECREASE")}>Decrease</button>
      <button onClick={() => dispatch("RESET")}>Reset</button>
    </>
  );
}

export default ExcuteReducer;
