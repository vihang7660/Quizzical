import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import blobTop from "./assets/blob.png";
import blobBottom from "./assets/blob2.png";

function App() {
  const [information, setInformation] = React.useState([]);

  const [count, setCount] = React.useState(0);

  const [gameOn, setGameOn] = React.useState(true);

  const [load, setLoad] = React.useState(true);

  React.useEffect(() => {
    if (gameOn === true) {
      setLoad(true);
      fetch("https://opentdb.com/api.php?amount=5&difficulty=easy")
        .then((resp) => resp.json())
        .then((data) => {
          setLoad(false);
          let details = data.results.map((item) => {
            item.id = nanoid();
            item.options = item.incorrect_answers.map((data) => {
              let dataInfo = {
                isHeld: false,
                value: data,
                correct: false,
                id: nanoid(),
              };
              return dataInfo;
            });
            item.options.push({
              isHeld: false,
              value: item.correct_answer,
              correct: true,
              id: nanoid(),
            });
            shuffle(item.options);
            return item;
          });
          setInformation(details);
        });
    }
  }, [gameOn]);

  console.log(information.map((item) => item.correct_answer));

  function checkAnswers() {
    setCount(() => {
      let arr = information.filter(
        (item) =>
          item.correct_answer ===
          item.options.filter((data) => data.isHeld).map((ans) => ans.value)[0]
      );
      return arr.length;
    });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let info = information.map((item) => {
    return (
      <Question
        ques={item.question}
        options={item.options}
        setInformation={setInformation}
        gameOn={gameOn}
        setGameOn={setGameOn}
        id={item.id}
        key={nanoid()}
      />
    );
  });

  return load ? (
    <div className="loadBox">
      <div className="lds-hourglass"></div>
    </div>
  ) : (
    <div className="block">
      <img className="blobTop" src={blobTop} alt="blobTop" />
      <img className="blobBottom" src={blobBottom} alt="blobBottom" />
      {info}
      <div className="infoBlock">
        <h2>{gameOn || `You gave ${count} answers correctly`}</h2>
        <button
          className="check"
          onClick={() => {
            checkAnswers();
            setGameOn((prevState) => !prevState);
          }}
        >
          {gameOn ? "Check Answers" : "Play Again"}
        </button>
      </div>
    </div>
  );
}

export default App;
