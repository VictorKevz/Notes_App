import React, { useContext, useEffect, useState } from "react";
import "./board.css";
import AsideBar from "../AsideBar/AsideBar";
import {
  Add,
  ArchiveOutlined,
  ArrowBack,
  DeleteOutlineOutlined,
  KeyboardArrowLeft,
  RestartAltOutlined,
  Settings,
} from "@mui/icons-material";
import logo from "../../assets/images/logo.svg";

import NoteCards from "../NoteCard/NoteCards";
import { DataContext } from "../../App";
import DetailedNote from "../DetailedNote/DetailedNote";
import SearchBar from "../SearchBar";
import SettingsPage from "../Settings/SettingsPage";
import NoteForm from "../NoteForm/NoteForm";
import Button from "../Button";
import WarningModal from "../WarningModal/WarningModal";
import TagList from "../TagList";
import { Routes, Route, Link } from "react-router-dom";
// import FilteredTagsPage from "../FilteredTags";

function Board() {
  const { notes, dispatchNotes, searchResults, setIsTablet, isTablet } =
    useContext(DataContext);

  const getTitle = () => {
    let title;
    if (notes.asideCurrentTab === "allNotes") {
      title = "All Notes";
    }
    if (notes.asideCurrentTab === "archivedNotes") {
      title = "Archived Notes";
    }
    if (notes.asideCurrentTab === "tags") {
      title = `Notes Tagged: ${notes.currentTag}`;
    }
    if (notes.asideCurrentTab === "settingsTab") {
      title = "Settings";
    }
    return title;
  };

  const archiveData = {
    text:
      notes.asideCurrentTab !== "archivedNotes"
        ? "Archive Note"
        : "Restore Note",
    icon:
      notes.asideCurrentTab !== "archivedNotes"
        ? ArchiveOutlined
        : RestartAltOutlined,
    actionType: "ARCHIVE_NOTE",

    parag:
      notes.asideCurrentTab !== "archivedNotes"
        ? "Are you sure you want to archive this note? You can find it in the Archived Notes section and restore it anytime."
        : "Are you sure you want to restore this note? This note will be restored to All Notes section.",
  };
  const deleteData = {
    text: "Delete Note",
    icon: DeleteOutlineOutlined,
    actionType: "DELETE_NOTE",
    parag:
      "Are you sure you want to delete this note? This action cannot be undone.",
  };
  const newNoteData = {
    text: "Create New Note",
    icon: Add,
    actionType: "SHOW_FORM",
    parag: "",
  };
  const isSettings = notes.asideCurrentTab === "settingsTab";

  useEffect(() => {
    const handleResize = () => setIsTablet(window.innerWidth <= 1200);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="board-wrapper mobile">
      <div className="aside desktop">
        <AsideBar />
      </div>

      <section className="content-wrapper desktop">
        <header className="content-header">
          <h1 className="main-title">{getTitle()}</h1>
          <div className="search-settings-wrapper">
            <SearchBar />
            <button
              type="button"
              className={`settings-btn ${isSettings && "active-settings-btn"}`}
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

        {isSettings ? (
          <SettingsPage />
        ) : (
          <div className="notes-detailed-wrapper">
            <div className="notes-wrapper">
              <Button data={newNoteData} />
              <NoteCards data={searchResults} />
            </div>

            <div className="detailed-notes-wrapper">
              {notes.showForm ? <NoteForm /> : <DetailedNote />}
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

      <section className="tablet-mobile-board">
        <header className="aside-header mobile">
          <img src={logo} alt="Notes App logo" className="logo" />
        </header>
        <div className="notes-wrapper">
          {notes.asideCurrentTab !== "settingsTab" &&
            isTablet &&
            !notes.showForm && (
              <div className="mobile-newNote">
                <Button data={newNoteData} />
              </div>
            )}
          <Routes>
            <Route path="/" element={<NoteCards data={searchResults} />} />
            <Route
              path="/archivedNotes"
              element={<NoteCards data={searchResults} />}
            />
            <Route path="/tags" element={<TagList />} />
            <Route
              path={`/filteredTags`}
              element={<NoteCards data={searchResults} />}
            />
            <Route path={`/searchTab`} element={<SearchBar />} />
            <Route
              path={`/details`}
              element={
                <div className="detailed-mobile-wrapper">
                  <div className="detailed-mobile-actions-container">
                    <Link
                      to={`${
                        notes.asideCurrentTab === "allNotes"
                          ? "/"
                          : `/${notes.asideCurrentTab}`
                      }`}
                      className="go-back-link"
                    >
                      <KeyboardArrowLeft /> Go Back
                    </Link>
                    <div className="detailed-delete-archive">
                      <Button data={deleteData} />
                      <Button data={archiveData} />
                    </div>
                  </div>
                  <DetailedNote />
                </div>
              }
            />
            <Route path="/newNote" element={<NoteForm />} />
            <Route path="/settingsTab" element={<SettingsPage />} />
          </Routes>
        </div>

        <AsideBar />
      </section>
      {notes.warningModal && <WarningModal />}
    </div>
  );
}

export default Board;
