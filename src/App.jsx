import { createContext, useEffect, useReducer, useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import { data } from "./data";

export const AppThemeContext = createContext();
export const DataContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TAB":
      const { tab,key } = action.payload;
      return {
        ...state,
        [key]: tab,
        currentTag:""
      };
    case "UPDATE_TAG":
      const { tag } = action.payload;
      return {
        ...state,
        currentTag: tag,
      };
     case"RENDER_SETTINGS":
     return{
      ...state,
      isSettings:true
     }

    default:
      return state;
  }
};

function App() {
  const savedData = localStorage.getItem("notes");
  const initialData = {
    notesData: savedData ? JSON.parse(savedData) : data,
    asideCurrentTab: "allNotes",
    currentTag: "",
    settingsCurrentTab: "colorTheme",
    isSettings:false,
    fontTheme:"'Inter', serif",
    colorTheme:"lightMode"
    
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
