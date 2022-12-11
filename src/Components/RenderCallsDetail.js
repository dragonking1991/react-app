import { useContext } from "react";
import { useParams } from "react-router-dom";
import { CallStore } from "../Contexts/CallContext";

export default function RenderCallsDetail() {
  const store = useContext(CallStore);
  const params = useParams();
  const details = store[params.conversId];

  const detailHtml =
    (details?.length &&
      details.map((item, index) => (
        <li key={index}>
          {item?.user && `User: ${item.user}`}
          {item?.agent && `Agent: ${item.agent}`}
        </li>
      ))) ||
    "";
  return <ul>{detailHtml}</ul>;
}
