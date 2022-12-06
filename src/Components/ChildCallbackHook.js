import { useEffect, useState } from "react";

const ChildCallbackHook = ({ getData }) => {
  const [comment, setComment] = useState([]);

  useEffect(() => {
    getData("comments")
      .then((res) => {
        console.log(res.data)
        setComment(res.data)});
  }, [getData]);

  return <p>{JSON.stringify(comment)}</p>;
};
export default ChildCallbackHook;
