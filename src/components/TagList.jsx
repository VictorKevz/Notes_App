import React, { useContext } from "react";
import { KeyboardArrowRight, LocalOfferOutlined } from "@mui/icons-material";
import "./AsideBar/asideBar.css";
import { DataContext } from "../App";
function TagList() {
  const { notes, dispatchNotes } = useContext(DataContext);
  const tagsList = notes?.notesData?.map((obj) => obj?.tags);
  const tagsArray = [...new Set(tagsList?.flat())];
  return (
    <ul className="tag-list">
      <li className="tag-heading-item">
        <h2 className="tag-heading">Tags</h2>
      </li>
      {tagsArray.map((tag) => {
        const isCurrent = tag === notes.currentTag;
        return (
          <li key={tag} className="tag-item">
            <button
              type="button"
              className={`btn ${isCurrent && "current-link"}`}
              onClick={() => {
                dispatchNotes({
                  type: "UPDATE_TAB",
                  payload: { tab: "tags", key: "asideCurrentTab" },
                });
                dispatchNotes({ type: "UPDATE_TAG", payload: { tag } });
              }}
            >
              <span className="btn-text">
                <LocalOfferOutlined className={`tag-icon ${isCurrent && "current-icon"}`} />
                {tag}
              </span>
              {isCurrent && <KeyboardArrowRight />}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default TagList;
