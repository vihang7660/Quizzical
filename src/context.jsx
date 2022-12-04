import React from "react";

const StateContext = React.createContext(null);

export function StateProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={{ state, dispatch }}>
      {children}
    </StateContext.Provider>
  );
}

export function useContextState() {
  return React.useContext(StateContext);
}

function reducer(state, action) {
  if (action.type === "loadingOn") {
    return { ...state, load: true };
  } else if (action.type === "loadingOff") {
    return { ...state, load: false };
  } else if (action.type === "fetchedData") {
    return { ...state, information: action.data };
  } else if (action.type === "numberOfAnswers") {
    return { ...state, count: action.data };
  } else if (action.type === "togglingGameMode") {
    return { ...state, gameOn: !state.gameOn };
  } else if (action.type === "selectingAnswer") {
    return {
      ...state,
      information: state.information.map((item) => {
        return item.id === action.Qid
          ? {
              ...item,
              options: item.options.map((data) =>
                data.id === action.id
                  ? { ...data, isHeld: !data.isHeld }
                  : { ...data, isHeld: false }
              ),
            }
          : item;
      }),
    };
  } else if (action.type === "togglingStartPageOff") {
    return { ...state, isStartPage: false };
  } else if (action.type === "changingFormData") {
    return {
      ...state,
      formdata: { ...state.formdata, [action.name]: action.value },
    };
  }
}

const initialState = {
  information: [],
  count: 0,
  gameOn: true,
  load: true,
  isStartPage: true,
  formdata: { category: "", amount: "amount=5", difficulty: "&difficulty=easy" },
  apiUrl: "https://opentdb.com/api.php?",
};
