import React, { useContext, useState } from "react";
import "./board.css";
import AsideBar from "../AsideBar/AsideBar";
import { Add, Settings } from "@mui/icons-material";
import NoteCards from "../NoteCards";
import { DataContext } from "../../App";
import DetailedNote from "../DetailedNote";

function Board() {
  const { notes, dispatchNotes } = useContext(DataContext);
  const [noteIndex, setNoteIndex] = useState(0);

  const filteredData = notes?.notesData?.filter((note) => {
    if (notes?.currentTab === "archivedNotes") {
      return note.isArchived;
    }
    if (notes?.currentTab === "tags") {
      return note?.tags?.includes(notes?.currentTag);
    } else {
      return true;
    }
  });
const currentNoteObj = filteredData?.[noteIndex]
  return (
    <div className="board-wrapper">
      <AsideBar />
      <section className="content-wrapper">
        <header className="content-header">
          <h1 className="title">All Notes</h1>
          <div className="search-settings-wrapper">
            <fieldset>
              <input type="text" className="search-input" />
            </fieldset>
            <button type="button">
              <Settings />
            </button>
          </div>
        </header>
        <div className="notes-detailed-wrapper">
        <div className="notes-wrapper">
          <button type="button" className="add-note-btn">
            {" "}
            <Add />
            Create New Note{" "}
          </button>
          <NoteCards
          data={filteredData}
            noteIndex={noteIndex}
            setNoteIndex={setNoteIndex}
          />
        </div>
        <div className="detailed-notes-wrapper">
          <DetailedNote obj={currentNoteObj} />
        </div>
        </div>
      </section>
    </div>
  );
}

export default Board;
