import React from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";
import { useContextState } from "./context";

export default function Question(props) {
  const { state, dispatch } = useContextState();
  function toggle(id, Qid) {
    dispatch({
      type: "selectingAnswer",
      id,
      Qid,
    });
  }

  let option = props.options.map((item) => {
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
          return state.gameOn ? toggle(item.id, props.id) : "";
        }}
      >
        {decode(item.value)}
      </li>
    );
  });

  return (
    <div className="question-block">
      <p className="question">{decode(props.ques)}</p>
      <ul className="optionBlock">{option}</ul>
    </div>
  );
}
