import React from "react";
import { useContextState } from "./context";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function Option(item) {
  const { state } = useContextState();

  function selectedClass() {
    if (state.gameOn) {
      return item.isHeld ? "selected" : "";
    } else {
      if (item.correct) {
        return "correctAnswer";
      } else if (item.isHeld === true && item.correct === false) {
        return "wrongAnswer";
      } else {
        return "notSelected";
      }
    }
  }
  return (
    <li
      className={"choices " + selectedClass()}
      key={nanoid()}
      onClick={() => {
        return state.gameOn ? item.toggle(item.id, item.qId) : "";
      }}
    >
      {decode(item.value)}
    </li>
  );
}
