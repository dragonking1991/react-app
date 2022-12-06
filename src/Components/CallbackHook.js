import { useCallback, useState } from "react";
import axios from "axios";
import ChildCallbackHook from "./ChildCallbackHook";

export default function CallBackHook() {
  const [users, setUsers] = useState([]);
  const getData = useCallback((type) => {
    return axios.get(`https://reqres.in/api/${type}`);
  }, []);

  const handleClick = () => {
    getData("users").then((res) => {
      setUsers(res.data);
    });
  };

  return (
    <>
      <button onClick={handleClick}>Click</button>
      <h3>User</h3>
      {JSON.stringify(users)}
      <h3>Child</h3>
      <ChildCallbackHook getData={getData} />
    </>
  );
}
