import React, { useContext } from "react";
import { DataContext } from "../App";

function NoteCards({ data, noteIndex, setNoteIndex }) {
  const { notes, dispatchNotes } = useContext(DataContext);

  
//   setCurrentNoteObj(filteredData[noteIndex])
  return (
    <article className="notes-list">
      {data?.map((note, index) => {
        const isCurrent = noteIndex === index;
        return (
          <div
            key={index}
            className={`note-card ${isCurrent && "current-note"}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              setNoteIndex(index);
            }}
          >
            <h3 className="note-title">{note?.title}</h3>
            <ul className="card-tag-list">
              {note?.tags?.map((tag, i) => (
                <li key={i} className="card-tag-item">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="card-date">{note?.lastEdited}</p>
          </div>
        );
      })}
    </article>
  );
}

export default NoteCards;
