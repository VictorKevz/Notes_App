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
import logoDark from "../../assets/images/logo-dark.png";

import NoteCards from "../NoteCard/NoteCards";
import { DataContext } from "../../App";
import DetailedNote from "../DetailedNote/DetailedNote";
import SearchBar from "../SearchBar";
import SettingsPage from "../Settings/SettingsPage";
import NoteForm from "../NoteForm/NoteForm";
import Button from "../Button";
import WarningModal from "../WarningModal/WarningModal";
import TagList from "../TagList";
import { Routes, Route, Link, NavLink } from "react-router-dom";
// import FilteredTagsPage from "../FilteredTags";

function Board() {
  const {
    notes,
    dispatchNotes,
    searchResults,
    setIsTablet,
    isTablet,
    getContent,
    isDark,
  } = useContext(DataContext);

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
    <div className={`board-wrapper mobile ${isDark && "dark-border"}`}>
      <div className="aside desktop">
        <AsideBar />
      </div>

      <section
        className={`content-wrapper desktop ${isDark && "dark-bl"}`}
        aria-labelledby="main-title"
      >
        <header
          className={`content-header ${isDark && "dark-bb"}`}
          aria-label="Page Header"
        >
          <h1 id="main-title" className="main-title">
            {getContent().title}
          </h1>
          <div className="search-settings-wrapper">
            <SearchBar aria-label="Search Notes" />
            <NavLink
              className={`settings-btn ${isSettings && "active-settings-btn"} ${
                isSettings && isDark && "dark-card-bg"
              }`}
              onClick={() => {
                dispatchNotes({
                  type: "UPDATE_TAB",
                  payload: { tab: "settingsTab", key: "asideCurrentTab" },
                });
              }}
              to={`/settingsTab`}
              aria-label="Settings"
              aria-current={isSettings ? "page" : undefined}
            >
              <Settings
                className={`settings-icon ${isSettings && "current-icon"}`}
                aria-hidden="true"
              />
            </NavLink>
          </div>
        </header>

        {isSettings ? (
          <SettingsPage aria-label="Settings Page" />
        ) : (
          <div className="notes-detailed-wrapper" aria-label="Notes Section">
            <div
              className={`notes-wrapper ${isDark && "dark-br"}`}
              aria-label="Notes List"
            >
              <Button data={newNoteData} aria-label="Create New Note" />
              <p className="main-paragraph" aria-live="polite">
                {getContent().parag}
              </p>

              <NoteCards data={searchResults} aria-label="Search Results" />
            </div>

            <div
              className={`detailed-notes-wrapper ${isDark && "dark-br"}`}
              aria-label="Detailed Notes Section"
            >
              {notes.showForm ? (
                <NoteForm aria-label="Note Form" />
              ) : (
                <DetailedNote aria-label="Detailed Note" />
              )}
            </div>

            {!notes.showForm && (
              <div
                className="btn-actions-wrapper"
                aria-label="Action Buttons Section"
              >
                <Button data={archiveData} aria-label="Archive Notes" />
                <Button data={deleteData} aria-label="Delete Notes" />
              </div>
            )}
          </div>
        )}
      </section>

      <section
        className={`tablet-mobile-board ${isDark && "dark-body-bg"}`}
        aria-labelledby="mobile-board-title"
      >
        <header
          className={`aside-header ${isDark && "dark-card-bg"}`}
          aria-label="App Header"
        >
          <img
            src={isDark ? logoDark : logo}
            alt="Notes App logo"
            className="logo"
          />
        </header>
        <div
          className={`notes-wrapper ${isDark && "dark-body-bg"}`}
          aria-label="Notes Content Wrapper"
        >
          {notes.asideCurrentTab !== "settingsTab" &&
            isTablet &&
            !notes.showForm && (
              <div
                className="mobile-newNote"
                aria-label="Create New Note Section"
              >
                <Button data={newNoteData} aria-label="Create New Note" />
              </div>
            )}
          <Routes>
            <Route
              path="/"
              element={
                <NoteCards
                  data={searchResults}
                  aria-label="Notes List for All Notes"
                />
              }
            />
            <Route
              path="/archivedNotes"
              element={
                <NoteCards
                  data={searchResults}
                  aria-label="Notes List for Archived Notes"
                />
              }
            />
            <Route path="/tags" element={<TagList aria-label="Tags List" />} />
            <Route
              path={`/filteredTags`}
              element={
                <NoteCards
                  data={searchResults}
                  aria-label="Notes List for Filtered Tags"
                />
              }
            />
            <Route
              path={`/searchTab`}
              element={<SearchBar aria-label="Search Notes" />}
            />
            <Route
              path={`/details`}
              element={
                <div
                  className="detailed-mobile-wrapper"
                  aria-label="Detailed Note View"
                >
                  <div
                    className={`detailed-mobile-actions-container ${
                      isDark && "dark-bb"
                    }`}
                    aria-label="Action Buttons for Detailed Note"
                  >
                    <Link
                      to={`${
                        notes.asideCurrentTab === "allNotes"
                          ? "/"
                          : `/${notes.asideCurrentTab}`
                      }`}
                      className="go-back-link"
                      aria-label="Go Back to Previous View"
                    >
                      <KeyboardArrowLeft aria-hidden="true" /> Go Back
                    </Link>
                    <div
                      className="detailed-delete-archive"
                      aria-label="Delete and Archive Actions"
                    >
                      <Button data={deleteData} aria-label="Delete Note" />
                      <Button data={archiveData} aria-label="Archive Note" />
                    </div>
                  </div>
                  <DetailedNote aria-label="Detailed Note Content" />
                </div>
              }
            />
            <Route
              path="/newNote"
              element={<NoteForm aria-label="New Note Form" />}
            />
            <Route
              path="/settingsTab"
              element={<SettingsPage aria-label="Settings Page" />}
            />
          </Routes>
        </div>

        <div
          className={`mobile-bottom-bar ${isDark && "dark-body-bg"}`}
          aria-label="Bottom Navigation Bar"
        >
          <AsideBar />
        </div>
      </section>
      {notes.warningModal && <WarningModal />}
    </div>
  );
}

export default Board;
