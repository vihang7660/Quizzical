import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

function App() {
  const [information, setInformation] = React.useState([]);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((resp) => resp.json())
      .then((data) => setInformation(data.results));
  }, []);
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let info = information.map((item) => {
    /* let options = [...item.incorrect_answers, item.correct_answer]; */
    let options = item.incorrect_answers.map((data) => {
      return { isHeld: false, value: data };
    });
    options.push({ isHeld: false, value: item.correct_answer });
    shuffle(options);
    
    return (
      <Question
        ques={item.question}
        correct={item.correct_answer}
        incorrect={item.incorrect_answers}
        options={options}
        key={nanoid()}
      />
    );
  });

  return <div>{info}</div>;
}

export default App;
