import { SearchOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext } from "../App";
import NoteCards from "./NoteCard/NoteCards";

function SearchBar() {
  const { query, setQuery, searchResults,dispatchNotes } = useContext(DataContext);

  return (
    <div className="search-bar mobile">
      <fieldset className="field">
        <SearchOutlined />
        <label htmlFor="searchBar" className="search-label">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
dispatchNotes({type:"UPDATE_TAB",payload:{tab:"searchTab",key:"asideCurrentTab"}});
            }}
            className="search-input"
            id="searchBar"
            placeholder="Search by title, content, or tags…"
          />
        </label>
      </fieldset>
      <div className="search-results">
      <NoteCards data={searchResults} />
      </div>
    </div>
  );
}

export default SearchBar;
