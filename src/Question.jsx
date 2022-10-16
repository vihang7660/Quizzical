import React from "react";
import { decode } from "html-entities";
import { nanoid } from "nanoid";

export default function Question(props) {
  let option = props.options.map((item) => {
    let style = { backgroundColor: item.isHeld ? "green" : "gray" };

    return (
      <h5 style={style} key={nanoid()}>
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
