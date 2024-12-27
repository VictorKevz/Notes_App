import { SearchOutlined } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext } from "../App";
import NoteCards from "./NoteCards";

function SearchBar() {
  const { query, setQuery, searchResults } = useContext(DataContext);

  return (
    <div className="search-bar mobile">
      <fieldset className="field">
        <SearchOutlined />
        <label htmlFor="searchBar" className="search-label">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
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
