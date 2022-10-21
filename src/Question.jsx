import React from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function Question(props) {
  function toggle(id, Qid) {
    props.setInformation((prevState) =>
      prevState.map((item) => {
        return item.id === Qid
          ? {
              ...item,
              options: item.options.map((data) =>
                data.id === id
                  ? { ...data, isHeld: !data.isHeld }
                  : { ...data, isHeld: false }
              ),
            }
          : item;
      })
    );
  }

  let option = props.options.map((item) => {
    function selectedClass() {
      if (props.gameOn) {
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
          return props.gameOn ? toggle(item.id, props.id) : "";
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
