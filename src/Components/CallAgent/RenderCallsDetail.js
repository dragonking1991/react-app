import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CallStore } from "../../Contexts/CallContext";

export default function RenderCallsDetail() {
  const store = useContext(CallStore);
  const params = useParams();
  const details = store[params.conversId]?.transcript.length
    ? store[params.conversId].transcript
    : [];
  const nameUser = store[params.conversId]?.name || "";

  const detailHtml =
    (details?.length &&
      details.map((item, index) => (
        <li key={index}>
          {item?.user && `${nameUser ? nameUser : "User"}: ${item.user}`}
          {item?.agent && `Agent: ${item.agent}`}
        </li>
      ))) ||
    "";
  return <ul>{detailHtml}</ul>;
}
