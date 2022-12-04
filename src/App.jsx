import React from "react";
import Question from "./Question";
import { nanoid } from "nanoid";
import blobTop from "./assets/blob.png";
import blobBottom from "./assets/blob2.png";
import { useContextState } from "./context";
import StartPage from "./Start";

function App() {
  const { state, dispatch } = useContextState();
  React.useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (state.gameOn === true) {
      dispatch({ type: "loadingOn" });
      fetch(
        state.apiUrl +
          state.formdata.amount +
          state.formdata.difficulty +
          state.formdata.category,
        {
          signal,
        }
      )
        .then((resp) => resp.json())
        .then((data) => {
          dispatch({ type: "loadingOff" });
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
          dispatch({ type: "fetchedData", data: details });
        })
        .catch(() => {
          console.log("unable to fetch");
          fetch("https://opentdb.com/api.php?amount=10", { signal })
            .then((resp) => resp.json())
            .then((data) => {
              dispatch({ type: "loadingOff" });
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
              dispatch({ type: "fetchedData", data: details });
            });
        });
      return () => {
        controller.abort();
      };
    }
  }, [state.gameOn, state.formdata]);


  if (state.isStartPage) {
    return <StartPage />;
  }

  function checkAnswers() {
    let arr = state.information.filter(
      (item) =>
        item.correct_answer ===
        item.options.filter((data) => data.isHeld).map((ans) => ans.value)[0]
    );
    dispatch({
      type: "numberOfAnswers",
      data: arr.length,
    });
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  let info = state.information.map((item) => {
    return (
      <Question
        ques={item.question}
        options={item.options}
        id={item.id}
        key={item.id}
      />
    );
  });

  return state.load ? (
    <div className="loadBox">
      <div className="lds-hourglass"></div>
    </div>
  ) : (
    <div className="block">
      <img className="blobTop" src={blobTop} alt="blobTop" />
      <img className="blobBottom" src={blobBottom} alt="blobBottom" />
      {info}
      <div className="infoBlock">
        <h2>{state.gameOn || `You gave ${state.count} answers correctly`}</h2>
        <button
          className="check"
          onClick={() => {
            checkAnswers();
            dispatch({ type: "togglingGameMode" });
          }}
        >
          {state.gameOn ? "Check Answers" : "Play Again"}
        </button>
      </div>
    </div>
  );
}

export default App;
