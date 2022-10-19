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
    let style = { backgroundColor: item.isHeld ? "green" : "aqua" };

    return (
      <h5
        style={style}
        key={nanoid()}
        onClick={() => toggle(item.id, props.id)}
      >
        {decode(item.value)}
      </h5>
    );
  });

  return (
    <div className="question-block">
      <h3 className="question">{decode(props.ques)}</h3>
      {option}
    </div>
  );
}
