import { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { CallStore } from "../../Contexts/CallContext";
import RenderCallsDetail from "./RenderCallsDetail";

export function RenderCalls() {
  const store = useContext(CallStore);
  const list = Object.keys(store);

  const listHtml = list.map((item) => (
    <li key={item}>
      <Link to={`/history/${item}`}>{store[item]?.phone || item}</Link>
    </li>
  ));

  return (
    <>
      <ul>{listHtml}</ul>
      <Routes>
        <Route path="/history/:conversId" element={<RenderCallsDetail />} />
      </Routes>
    </>
  );
}
