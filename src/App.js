import "./App.css";
import { CallProvider } from "./Contexts/CallContext";
import { RenderCalls } from "./Components/RenderCalls";
import ExcuteReducer from "./lesson/UseReducer";

const App = () => {
  return (
    <>
      {/* <CallProvider>
        <RenderCalls />
      </CallProvider> */}
      <ExcuteReducer />
    </>
  );
};

export default App;
