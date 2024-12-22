import React, { useContext } from "react";
import { DataContext } from "../App";

function Button({ data }) {
  const { notes, dispatchNotes } = useContext(DataContext);
  return (
    <button
      className="reusable-btn"
      onClick={() =>
        dispatchNotes({
          type: `${data.typeText}`,
          payload: { id: notes?.currentNoteId },
        })
      }
    >
      <data.icon /> {data.text}
    </button>
  );
}

export default Button;
