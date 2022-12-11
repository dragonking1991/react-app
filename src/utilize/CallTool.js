export const parseDetail = (res) => {
  const detail = {};

  const timestamp = res.receiveTimestamp.seconds;
  const dateTime =
    timestamp && new Date(parseInt(timestamp) * 1000).toLocaleString();
  detail.date = dateTime || "";

  // user and agent conversation
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

export const convertData = (records) => {
  const listID = [];
  const newData = {};

  records.forEach((record) => {
    const id = record?.labels?.session_id;

    // console.log("datas", id, record);

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
