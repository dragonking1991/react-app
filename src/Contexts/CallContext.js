import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { convertData } from "../utilize/CallConvert";

const apiEndPoint =
  "https://us-central1-forward-camera-345608.cloudfunctions.net/cloudLoggingCheck";

export const CallStore = createContext();

export function CallProvider({ children }) {
  const [conversation, setConversation] = useState({});

  useEffect(() => {
    axios
      .get(apiEndPoint)
      .then((res) => {
        const datas = res.data[0];
        const infos = convertData(datas);
        setConversation(infos);
        console.log("infos", infos);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <CallStore.Provider value={conversation}>{children}</CallStore.Provider>
    </>
  );
}
