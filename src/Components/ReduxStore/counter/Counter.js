import React, { createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrement, increment, incrementByAmount } from "./counterSlice";

export function Counter() {
  const ref = createRef();
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <p>{count}</p>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <br />
        <br />
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <br />
        <br />
        <input type="text" ref={ref} />
        <button
          aria-label="Decrement value"
          onClick={() =>
            dispatch(incrementByAmount(parseInt(ref.current.value)))
          }
        >
          incrementByAmount
        </button>
        <br />
      </div>
    </div>
  );
}
