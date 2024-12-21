import React, { useContext, useState } from "react";
import "./board.css";
import AsideBar from "../AsideBar/AsideBar";
import { Add, Settings } from "@mui/icons-material";
import NoteCards from "../NoteCards";
import { DataContext } from "../../App";
import DetailedNote from "../DetailedNote";
import SearchBar from "../SearchBar";
import SettingsPage from "../Settings/SettingsPage";

function Board() {
  const { notes, dispatchNotes } = useContext(DataContext);
  const [noteIndex, setNoteIndex] = useState(0);
  const [query, setQuery] = useState("");

  const filteredData = notes?.notesData?.filter((note) => {
    if (notes?.asideCurrentTab === "archivedNotes") {
      return note?.isArchived;
    }
    if (notes?.asideCurrentTab === "tags") {
      return note?.tags?.includes(notes?.currentTag);
    } else {
      return true;
    }
  });

  const searchResults = filteredData.filter(
    (note) =>
      note?.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
      note?.tags?.map((tag) => tag.toLowerCase().includes(query.toLowerCase()))
  );
  const currentNoteObj = filteredData?.[noteIndex];
  return (
    <div className="board-wrapper">
      <AsideBar />
      <section className="content-wrapper">
        <header className="content-header">
          <h1 className="title">All Notes</h1>
          <div className="search-settings-wrapper">
            <SearchBar query={query} setQuery={setQuery} />
            <button
              type="button"
              className="settings-btn"
              onClick={() => {
                dispatchNotes({
                  type: "UPDATE_TAB",
                  payload: { tab: "settingsTab", key: "asideCurrentTab" },
                });
              }}
            >
              <Settings className="settings-icon" />
            </button>
          </div>
        </header>

        {notes.asideCurrentTab === "settingsTab" ? (
          <SettingsPage />
        ) : (
          <div className="notes-detailed-wrapper">
            <div className="notes-wrapper">
              <button type="button" className="add-note-btn">
                {" "}
                <Add />
                Create New Note{" "}
              </button>
              <NoteCards
                data={searchResults}
                noteIndex={noteIndex}
                setNoteIndex={setNoteIndex}
              />
            </div>

            <div className="detailed-notes-wrapper">
              <DetailedNote obj={currentNoteObj} />
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default Board;
