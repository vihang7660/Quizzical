import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";

function App() {
  const [information, setInformation] = React.useState([]);

  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
      .then((resp) => resp.json())
      .then((data) => {
        let details = data.results.map((item) => {
          item.id = nanoid();
          item.options = item.incorrect_answers.map((data) => {
            let dataInfo = {
              isHeld: false,
              value: data,
              id: nanoid(),
            };
            return dataInfo;
          });
          item.options.push({
            isHeld: false,
            value: item.correct_answer,
            id: nanoid(),
          });
          shuffle(item.options);
          return item;
        });
        setInformation(details);
      });
  }, []);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let info = information.map((item, index) => {
    return (
      <Question
        ques={item.question}
        options={item.options}
        setInformation={setInformation}
        id={item.id}
        key={nanoid()}
      />
    );
  });

  return (
    <div>
      {info}
      <h2 onClick={() => setCount(count + 1)}>{count}</h2>
    </div>
  );
}

export default App;
