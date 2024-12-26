import { createContext, useEffect, useReducer, useState } from "react";
import uuid from "react-uuid";
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
        showDetailed:false
      };
    case "UPDATE_TAG":
      const { tag } = action.payload;
      return {
        ...state,
        currentTag: tag,
        showDetailed:true
      };
    case "UPDATE_NOTE":
      const { id } = action.payload;
      return {
        ...state,
        currentNoteId: id,
        showDetailed:true
      };
    case "OPEN_MODAL":
      const { modalId, icon, typeText, parag, modalTitle } = action.payload;
      return {
        ...state,
        warningModal: true,
        modalData: { modalId, icon, typeText, parag, modalTitle },
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        warningModal: false,
        modalData: {},
      };
    case "DELETE_NOTE":
      return {
        ...state,
        notesData: state.notesData.filter(
          (note) => note?.id !== state?.currentNoteId
        ),
        warningModal: false,
        modalData: {},
      };
    case "ARCHIVE_NOTE":
      return {
        ...state,
        notesData: state.notesData.map((note) =>
          note.id === state.currentNoteId
            ? {
                ...note,
                isArchived: !note.isArchived,
              }
            : note
        ),
        warningModal: false,
        modalData: {},
      };

    case "SHOW_FORM":
      return {
        ...state,
        showForm: true,
        asideCurrentTab: "allNotes",
        currentTag: "",
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
      const { isValid } = action.payload;
      return {
        ...state,
        isValid: {
          ...isValid,
        },
      };
    case "CREATE_NOTE":
      const { title, tags, content,lastEdited } = action.payload;
      return {
        ...state,
        notesData: [
          { id: uuid(), title, tags,lastEdited, content, isArchived: false },
          ...state.notesData,
        ],
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
    case "EDIT_NOTE":
      const { editNoteId, title:editTitle,tags:editTags,content:editContent,lastEdited:newData } = action.payload;
      return {
        ...state,
        notesData: state.notesData.map((note) =>
          note.id === editNoteId
            ? {
                ...note,
                title:editTitle,
                tags:editTags,
                content:editContent,
                lastEdited:newData

              }
            : note
        ),
        currentNoteId:editNoteId
      };
      case "TOGGLE_DETAILS_PAGE":
        return{
          ...state,
          showDetailed:false
        }
    default:
      return state;
  }
};

function App() {
  const savedData = localStorage.getItem("notes");
  const parsedData = JSON.parse(savedData);
  const initialData = {
    notesData: parsedData ? parsedData : data,
    asideCurrentTab: "allNotes",
    currentNoteId:
      parsedData?.length > 0
        ? parsedData?.[0].id
        : data?.length > 0
        ? data[0].id
        : null,
    currentTag: "",
    settingsCurrentTab: "colorTheme",
    warningModal: false,
    showDetailed:false,
    modalData: {},
    fontTheme: JSON.parse(localStorage.getItem("fontTheme")) || "'Inter', serif",
    colorTheme: JSON.parse(localStorage.getItem("colorTheme")) || "lightMode",
    showForm: false,
    form: {
      title: "",
      tags: "",
      content: "",
      lastEdited:""
    },
    isValid: {
      title: true,
      tags: true,
      content: true,
    },
  };
  const [notes, dispatchNotes] = useReducer(notesReducer, initialData);

  const [query, setQuery] = useState("");

  const filteredData = notes?.notesData?.filter((note) => {
    if (notes?.asideCurrentTab === "archivedNotes") {
      return note?.isArchived;
    }
    if (notes?.asideCurrentTab === "tags") {
      return note?.tags?.includes(notes?.currentTag) && !note?.isArchived;
    } else {
      return !note?.isArchived;
    }
  });

  const searchResults = filteredData.filter(
    (note) =>
      note?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
      note?.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );
  const currentNoteObj = searchResults?.find(
    (note) => note?.id === notes?.currentNoteId
  );
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes?.notesData));
  }, [notes?.notesData]);

  useEffect(() => {
    if (
      searchResults.length > 0 &&
      !searchResults.some((note) => note.id === notes.currentNoteId)
    ) {
      dispatchNotes({
        type: "UPDATE_NOTE",
        payload: { id: searchResults[0]?.id },
      });
    }
  }, [searchResults, notes.currentNoteId]);

  const isDark = notes.colorTheme === "darkMode";
  return (
    <DataContext.Provider
      value={{
        notes,
        dispatchNotes,
        currentNoteObj,
        searchResults,
        query,
        setQuery,
        isDark,
      }}
    >
      <main
        className={`outer-container ${isDark && "dark-body-bg"}`}
        style={{ fontFamily: `${notes.fontTheme}` }}
      >
        <Board />

      </main>
    </DataContext.Provider>
  );
}

export default App;
