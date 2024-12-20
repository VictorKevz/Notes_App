import React, { useContext } from "react";
import { LocalOfferOutlined } from "@mui/icons-material";
import "./AsideBar/asideBar.css"
import { DataContext } from "../App";
function TagList() {
    const{notes,dispatchNotes} = useContext(DataContext)
  const tagsList = notes?.notesData?.map((obj) => obj?.tags);
  const tagsArray = [...new Set(tagsList?.flat())];
  return (
    <ul className="tag-list">
      <li className="tag-heading-item">
        <h2 className="tag-heading">Tags</h2>
      </li>
      {tagsArray.map((tag) => {
        return (
          <li key={tag} className="tag-item">
            <button type="button" className="tag-btn" onClick={() => {
              dispatchNotes({type:"UPDATE_TAB",payload:{tab:"tags"}})
              dispatchNotes({type:"UPDATE_TAG",payload:{tag}})
            }}>
              <LocalOfferOutlined className="tag-icon" />
              {tag}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TagList;
