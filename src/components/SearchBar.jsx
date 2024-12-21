import { SearchOutlined } from "@mui/icons-material";
import React from "react";

function SearchBar({ query, setQuery }) {
  return (
    <fieldset className="field">
        <SearchOutlined/>
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
  );
}

export default SearchBar;
