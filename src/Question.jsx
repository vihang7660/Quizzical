import React from "react";
import { decode } from "html-entities";
import { useContextState } from "./context";
import Option from "./Option";

export default function Question(props) {
  const { dispatch } = useContextState();
  function toggle(id, Qid) {
    dispatch({
      type: "selectingAnswer",
      id,
      Qid,
    });
  }
  console.log(props.options);
  let option = props.options.map((item) => {
    return <Option qId={props.id} toggle={toggle} key={item.id} {...item} />;
  });

  return (
    <div className="question-block">
      <p className="question">{decode(props.ques)}</p>
      <ul className="optionBlock">{option}</ul>
    </div>
  );
}
