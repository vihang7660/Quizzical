import React from "react";
import { useContextState } from "./context";
import blobTop from "./assets/blob.png";
import blobBottom from "./assets/blob2.png";

export default function StartPage() {
  const [categoryList, setCategoryList] = React.useState([]);
  const { state, dispatch } = useContextState();
  React.useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((resp) => resp.json())
      .then((data) => setCategoryList(data.trivia_categories));
  }, []);

  function SingleCategory({ id, name }) {
    return <option value={`&category=${id}`}>{name}</option>;
  }

  let categoryOptions = categoryList.map((item) => (
    <SingleCategory key={item.id} id={item.id} name={item.name} />
  ));
  function handleChange(e) {
    dispatch({
      type: "changingFormData",
      name: e.target.name,
      value: e.target.value,
    });
  }
  return (
    <div className="startPage">
      <img className="blobTop" src={blobTop} alt="blobTop" />
      <img className="blobBottom" src={blobBottom} alt="blobBottom" />

      <form>
        <label htmlFor="amount">Number of Questions</label>
        <select
          onChange={handleChange}
          id="amount"
          name="amount"
          value={state.formdata.amount}
        >
          <option value="amount=5">5</option>
          <option value="amount=10">10</option>
          <option value="amount=15">15</option>
          <option value="amount=20">20</option>
        </select>

        <label htmlFor="category">Choose Category</label>
        <select
          value={state.formdata.category}
          onChange={handleChange}
          name="category"
          id="category"
        >
          <option value="">Random</option>
          {categoryOptions}
        </select>

        <label htmlFor="difficulty">Difficulty</label>
        <select
          onChange={handleChange}
          id="difficulty"
          name="difficulty"
          value={state.formdata.difficulty}
        >
          <option value="&difficulty=easy">Easy</option>
          <option value="&difficulty=medium">Medium</option>
          <option value="&difficulty=hard">Hard</option>
        </select>
      </form>

      <button onClick={() => dispatch({ type: "togglingStartPageOff" })}>
        start
      </button>
    </div>
  );
}
