import { useEffect, useRef, useState } from "react";
import "./ControlElements.scss";
import Dom from "./Dom";

const CtrlDoms = () => {
  const [childs, setChilds] = useState([]);
  const warpperRef = useRef(null);
  const trashRef = useRef(null);
  const childId = useRef(0);

  useEffect(() => {
    document.addEventListener("gesturestart", (e) => e.preventDefault());
    return () =>
      document.removeEventListener("gesturestart", (e) => e.preventDefault());
  }, []);

  const createElement = () => {
    childId.current += 1;
    const maxWidth = warpperRef.current?.offsetWidth || 0;
    const maxHeight = warpperRef.current?.offsetHeight || 0;

    const infoChild = {
      id: childId.current,
      name: "Sticker",
      x: maxWidth / 2,
      y: maxHeight / 2,
      w: 150,
      h: 150,
    };

    setChilds(
      childs.concat(
        <Dom
          key={infoChild.id}
          info={infoChild}
          parentCallBack={checkElement}
        />
      )
    );
  };

  const checkElement = ( point, id) => {
    const trashTop = trashRef.current?.offsetTop || 0;
    const trashLeft = trashRef.current?.offsetLeft || 0;
    const trashWidth = trashRef.current?.offsetWidth || 0;
    const trashHeight = trashRef.current?.offsetHeight || 0;

    const checkIntentRemoveElement =
      point.x < trashLeft ||
      point.y < trashTop ||
      point.x > trashLeft + trashWidth ||
      point.y > trashTop + trashHeight;

    if (!checkIntentRemoveElement) {
      setChilds(childs.filter((child) => parseInt(child.key) !== id));
    }
  };

  return (
    <>
      <div className="wrapper" ref={warpperRef}>
        {childs}
        <button onClick={() => createElement()}>Create</button>
        <div className="destroy" ref={trashRef}>
          Trash
        </div>
      </div>
      {JSON.stringify(childs)}
    </>
  );
};

export default CtrlDoms;
