import React, { useContext, useState } from "react";
import "./board.css";
import AsideBar from "../AsideBar/AsideBar";
import {
  Add,
  ArchiveOutlined,
  DeleteOutlineOutlined,
  RestartAltOutlined,
  Settings,
} from "@mui/icons-material";
import NoteCards from "../NoteCards";
import { DataContext } from "../../App";
import DetailedNote from "../DetailedNote";
import SearchBar from "../SearchBar";
import SettingsPage from "../Settings/SettingsPage";
import NoteForm from "../NoteForm/NoteForm";
import Button from "../Button";
import WarningModal from "../WarningModal/WarningModal";

function Board() {
  const { notes, dispatchNotes, currentNoteObj, searchResults } =
    useContext(DataContext);

  const archiveData = {
    text:
      notes.asideCurrentTab !== "archivedNotes"
        ? "Archive Note"
        : "Restore Note",
    icon:
      notes.asideCurrentTab !== "archivedNotes"
        ? ArchiveOutlined
        : RestartAltOutlined,
    typeText: "ARCHIVE_NOTE",

    parag:
      notes.asideCurrentTab !== "archivedNotes"
        ? "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
        : "Are you sure you want to restore this note? This note will be restored to All Notes section.",
  };
  const deleteData = {
    text: "Delete Note",
    icon: DeleteOutlineOutlined,
    typeText: "DELETE_NOTE",
    parag:
      "Are you sure you want to delete this note? This action cannot be undone.",
  };
  return (
    <div className="board-wrapper">
      <AsideBar obj={currentNoteObj} />
      <section className="content-wrapper">
        <header className="content-header">
          <h1 className="title">All Notes</h1>
          <div className="search-settings-wrapper">
            <SearchBar />
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
              <button
                type="button"
                className="add-note-btn"
                onClick={() => dispatchNotes({ type: "SHOW_FORM" })}
              >
                <Add /> Create New Note
              </button>
              <NoteCards data={searchResults} />
            </div>

            <div className="detailed-notes-wrapper">
              {notes.showForm ? (
                <NoteForm />
              ) : (
                <DetailedNote obj={currentNoteObj} />
              )}
            </div>
            {!notes.showForm && (
              <div className="btn-actions-wrapper">
                <Button data={archiveData} />

                <Button data={deleteData} />
              </div>
            )}
          </div>
        )}
      </section>
      {notes.warningModal && <WarningModal />}
    </div>
  );
}

export default Board;
