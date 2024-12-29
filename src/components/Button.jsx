import React, { useContext } from "react";
import { DataContext } from "../App";
import { Link } from "react-router-dom";

function Button({ data }) {
  const { notes, dispatchNotes, isTablet, isDark } = useContext(DataContext);
  const isNewNote = data.actionType === "SHOW_FORM";
  return (
    <>
      {isTablet && data.text === "Create New Note" ? (
        <Link
          className={`reusable-btn mobile ${isNewNote && "add-note-btn"} 
          
          `}
          onClick={() => {
            dispatchNotes({
              type: `${
                data.actionType === "SHOW_FORM" ? "SHOW_FORM" : "OPEN_MODAL"
              }`,
              payload: {
                modalId: notes?.currentNoteId,
                icon: data.icon,
                typeText: data.actionType,
                modalTitle: data.text,
                parag: data.parag,
              },
            });
          }}
          to="/newNote"
        >
          <data.icon />{" "}
          <span className="nav-text mobile new-note-btn">{data.text}</span>
        </Link>
      ) : (
        <button
          type="button"
          className={`reusable-btn mobile ${isNewNote && "add-note-btn"} ${isDark && !isNewNote && "dark-border"}`}
          onClick={() => {
            dispatchNotes({
              type: `${
                data.actionType === "SHOW_FORM" ? "SHOW_FORM" : "OPEN_MODAL"
              }`,
              payload: {
                modalId: notes?.currentNoteId,
                icon: data.icon,
                typeText: data.actionType,
                modalTitle: data.text,
                parag: data.parag,
              },
            });
          }}
        >
          <data.icon className={`${isDark && "dark-text-primary"}`}/> <span className={`nav-text mobile ${isDark && "dark-text-primary"}`}>{data.text}</span>
        </button>
      )}
    </>
  );
}

export default Button;
