import "./App.css";
import { CallProvider } from "./Contexts/CallContext";
import { RenderCalls } from "./Components/RenderCalls";

const App = () => {
  return (
    <>
      <CallProvider>
        <RenderCalls />
      </CallProvider>
    </>
  );
};

export default App;
