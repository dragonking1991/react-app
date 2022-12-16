const parseDetail = (res) => {
  const detail = {};

  const timestamp = res.receiveTimestamp.seconds;
  const dateTime =
    timestamp && new Date(parseInt(timestamp) * 1000).toLocaleString();
  detail.date = dateTime || "";
  // console.log('parseDetail',res?.labels?.session_id, res,detail.date);

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
    queryResult?.structValue?.fields?.responseMessages?.listValue?.values;

  let agentText = "";
  agentRes?.length &&
    agentRes.forEach((res) => {
      const text =
        res.structValue?.fields?.text?.structValue?.fields?.text?.listValue
          ?.values[0].stringValue || " ";
      agentText += text;
    });

  if (agentText) {
    detail.agent = agentText;
  }

  // console.log(res, userInput && userInput, agentText && agentText);

  return detail;
};

export const convertData = (records) => {
  const listID = [];
  const newData = {};

  records.forEach((record) => {
    const id = record?.labels?.session_id;

    const nameUser =
      record?.jsonPayload?.fields?.queryResult?.structValue?.fields?.parameters
        ?.structValue?.fields?.nameUser?.stringValue;
    const phoneUser =
      record?.jsonPayload?.fields?.queryResult?.structValue?.fields?.parameters
        ?.structValue?.fields?.phoneUser?.stringValue;

    if (id) {
      if (!listID.includes(id)) {
        listID.push(id);
        newData[id] = {};
        newData[id].transcript = [];
        newData[id].name = nameUser || "";
        newData[id].phone = phoneUser || "";
      }
      const detail = parseDetail(record);
      (detail?.user || detail?.agent) && newData[id].transcript.unshift(detail);
    }
  });

  return newData;
};
