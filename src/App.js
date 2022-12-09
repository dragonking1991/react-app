import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const parseDetail = (res) => {
  // user and agent conversation
  const detail = {};
  //user input
  const queryInput = res?.jsonPayload?.fields?.queryInput;
  const userInput =
    queryInput?.structValue?.fields?.text?.structValue?.fields?.text
      ?.stringValue;
  if (userInput) {
    detail.user = userInput;
  }

  //agent response
  const queryResult = res?.jsonPayload?.fields?.queryResult;
  const agentRes =
    queryResult?.structValue?.fields?.responseMessages?.listValue?.values[0]
      .structValue?.fields?.text?.structValue?.fields?.text?.listValue?.values;

  let agentText = "";
  agentRes?.length &&
    agentRes.forEach((res) => {
      agentText += res.stringValue;
    });

  if (agentText) {
    detail.agent = agentText;
  }
  return detail;
};

const convertData = (records) => {
  const listID = [];
  const newData = {};

  records.forEach((record) => {
    const id = record?.labels?.session_id;

    console.log("datas", id, record);

    if (id) {
      if (!listID.includes(id)) {
        listID.push(id);
        newData[id] = [];
      }
      newData[id].unshift(parseDetail(record));
    }
  });

  return newData;
};

const App = () => {
  const [conversation, setConversation] = useState({});

  const apiEndPoint =
    "https://us-central1-forward-camera-345608.cloudfunctions.net/cloudLoggingCheck";
  useEffect(() => {
    axios
      .get(apiEndPoint)
      .then((res) => {
        const datas = res.data[0];
        const infos = convertData(datas);
        setConversation(infos)
        console.log("convertData", infos);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <>
      {conversation}
    </>
  );
};

export default App;
