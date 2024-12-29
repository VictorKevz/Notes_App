import React, { useContext } from "react";
import { DataContext } from "../../App";
import { NavLink, Link } from "react-router-dom";
import { KeyboardArrowLeft } from "@mui/icons-material";
import "./noteCards.css";
function NoteCards({ data }) {
  const { notes, dispatchNotes, isTablet,getContent,isDark } = useContext(DataContext);
  // const getTitle = () => {
  //   let title;
  //   if (notes.asideCurrentTab === "allNotes") {
  //     title = "All Notes";
  //   }
  //   if (notes.asideCurrentTab === "archivedNotes") {
  //     title = "Archived Notes";
  //   }
    
  //   if (notes.asideCurrentTab === "settingsTab") {
  //     title = "Settings";
  //   }
  //   return title;
  // };
  return (
    <article className="notes-list">
      {isTablet && notes.asideCurrentTab !== "searchTab" && notes.asideCurrentTab === "tags" &&(
        <div className="tag-actions-wrapper">
          <Link to="/tags" className="go-back-link tags">
            <KeyboardArrowLeft /> Go Back
          </Link>
          <h2 className="main-title">Notes Tagged : {notes?.currentTag}</h2>
          <p className="main-paragraph">
            All notes with the '{notes?.currentTag}' tag are shown here.
          </p>
        </div>
      )}
      {isTablet && notes.asideCurrentTab !== "tags" && (
       <>
        <h1 className="main-title">{getContent().title}</h1>
        <p className="main-paragraph">{getContent().parag}</p>
       </>

      )}
      {data?.map((note) => {
        const isCurrent = notes?.currentNoteId === note.id;
        const lastEdited = note?.lastEdited;
        const formattedDate = new Date(lastEdited).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        return (
          <React.Fragment key={note.id}>
          {isTablet ? (
            <NavLink
            key={note.id}
            className={`note-card ${isCurrent && "current-note"} `}
            role="button"
            tabIndex={0}
            onClick={() => {
              dispatchNotes({ type: "UPDATE_NOTE", payload: { id: note?.id } });
            }}
            to="/details"
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
          </NavLink>
          ):(
            <div
            className={`note-card ${isCurrent && "current-note"} ${isDark && "dark-bb"} ${isDark && isCurrent && "dark-card-bg"}`}
            role="button"
            tabIndex={0}
            onClick={() => {
              dispatchNotes({ type: "UPDATE_NOTE", payload: { id: note?.id } });
            }}
          >
            <h3 className="note-title">{note?.title}</h3>
            <ul className="card-tag-list">
              {note?.tags?.map((tag, i) => (
                <li key={i} className={`card-tag-item ${isDark && "dark-tag-item"}`}>
                  {tag}
                </li>
              ))}
            </ul>
            <p className="card-date">{formattedDate}</p>
          </div>
          )}
          </React.Fragment>
        );
      })}
    </article>
  );
}

export default NoteCards;
