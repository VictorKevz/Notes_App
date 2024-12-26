import React, { useContext } from "react";
import { DataContext } from "../App";

function Button({ data }) {
  const { notes, dispatchNotes } = useContext(DataContext);
  return (
    <button
      className={`reusable-btn mobile ${data.actionType === "SHOW_FORM" && "add-note-btn"}`}
      onClick={() =>
        dispatchNotes({
          type: `${data.actionType === "SHOW_FORM" ? "SHOW_FORM" : "OPEN_MODAL"}`,
          payload: { 
            modalId: notes?.currentNoteId,
            icon:data.icon,
            typeText:data.actionType,
            modalTitle:data.text,
            parag:data.parag

          },
        })
      }
    >
      <data.icon /> <span className="nav-text mobile">{data.text}</span>
    </button>
  );
}

export default Button;
