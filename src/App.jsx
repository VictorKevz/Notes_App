import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { data } from "./data";

export const AppThemeContext = createContext();
export const DataContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TAB":
      const { tab } = action.payload;
      return {
        ...state,
        currentTab: tab,
      };
    case "UPDATE_TAG":
      const { tag } = action.payload;
      return {
        ...state,
        currentTag: tag,
      };

    default:
      return state;
  }
};

function App() {
  const savedData = localStorage.getItem("notes");
  const initialData = {
    notesData: savedData ? JSON.parse(savedData) : data,
    currentTab: "allNotes",
    currentTag: "",
    
  };
  const [notes, dispatchNotes] = useReducer(notesReducer, initialData);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes?.notesData));
  }, [notes?.notesData]);
  return (
    <DataContext.Provider value={{ notes, dispatchNotes }}>
      <main className="outer-container">
        <Board />
      </main>
    </DataContext.Provider>
  );
}

export default App;
