import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function () {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  return (
    <div onClick={() => dispatch({ type: "test" })}>
      Hello! {JSON.stringify(state)}
    </div>
  );
}
