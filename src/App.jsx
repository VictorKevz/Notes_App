import { createContext, useEffect, useReducer, useState } from "react";
import uuid from 'react-uuid';
import "./App.css";
import Board from "./components/Board/Board";
import { data } from "./data";

export const AppThemeContext = createContext();
export const DataContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_TAB":
      const { tab, key } = action.payload;
      return {
        ...state,
        [key]: tab,
        currentTag: "",
        showForm: false,
      };
    case "UPDATE_TAG":
      const { tag } = action.payload;
      return {
        ...state,
        currentTag: tag,
      };
    case "SHOW_FORM":
      return {
        ...state,
        showForm: true,
        asideCurrentTab: "allNotes",
      };
      case "HIDE_FORM":
        return {
          ...state,
          showForm: false,
          asideCurrentTab: "allNotes",
        };  
    case "UPDATE_FORM":
      const { name, value } = action.payload;
      return {
        ...state,
        form: {
          ...state.form,
          [name]: value,
        },
        isValid: {
          ...state.isValid,
          [name]: true,
        },
      };
      case "VALIDATE_FORM":
        const{isValid} = action.payload
        return{
          ...state,
          isValid:{
            ...isValid
          }
        }
    case "CREATE_NOTE":
      const { title, tags, content } = action.payload;
      return {
        ...state,
        notesData: [
          { id: uuid(), title, tags, content, isArchived: false },
          ...state.notesData,
        ],
        showForm:false,
        form: {
          title: "",
          tags: "",
          content: "",
        },
        isValid: {
          title: true,
          tags: true,
          content: true,
        },
      };
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
    fontTheme: "'Inter', serif",
    colorTheme: "lightMode",
    showForm: false,
    form: {
      title: "",
      tags: "",
      content: "",
    },
    isValid: {
      title: true,
      tags: true,
      content: true,
    },
  };
  const [notes, dispatchNotes] = useReducer(notesReducer, initialData);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes?.notesData));
  }, [notes?.notesData]);
  return (
    <DataContext.Provider value={{ notes, dispatchNotes }}>
      <main
        className="outer-container"
        style={{ fontFamily: `${notes.fontTheme}` }}
      >
        <Board />
      </main>
    </DataContext.Provider>
  );
}

export default App;
