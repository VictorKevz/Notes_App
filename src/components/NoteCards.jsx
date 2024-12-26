import React, { useContext } from "react";
import { DataContext } from "../App";

function NoteCards({ data }) {
  const { notes, dispatchNotes } = useContext(DataContext);

  return (
    <article className="notes-list">
      {data?.map((note) => {
        const isCurrent = notes?.currentNoteId === note.id;
        const lastEdited = note?.lastEdited;
        const formattedDate = new Date(lastEdited).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return (
          <div
            key={note.id}
            className={`note-card ${isCurrent && "current-note"}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              dispatchNotes({ type: "UPDATE_NOTE", payload: { id: note?.id } });
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
            <p className="card-date">{formattedDate}</p>
          </div>
        );
      })}
    </article>
  );
}

export default NoteCards;
