import React, { useContext } from "react";
import { DataContext } from "../App";

function Button({ data }) {
  const { notes, dispatchNotes } = useContext(DataContext);
  return (
    <button
      className="reusable-btn"
      onClick={() =>
        dispatchNotes({
          type: "OPEN_MODAL",
          payload: { 
            modalId: notes?.currentNoteId,
            icon:data.icon,
            typeText:data.typeText,
            modalTitle:data.text,
            parag:data.parag

          },
        })
      }
    >
      <data.icon /> {data.text}
    </button>
  );
}

export default Button;
