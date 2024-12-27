import {
  AccessTimeFilledOutlined,
  Check,
  Close,
  LocalOfferOutlined,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./detailedNote.css";
import { DataContext } from "../../App";

function DetailedNote() {
  const { dispatchNotes, currentNoteObj: obj } = useContext(DataContext);
  const [editFields, setEditFields] = useState([]);
  const [editForm, setEditForm] = useState({
    title: obj?.title,
    tags: obj?.tags.join(", "),
    content: obj?.content,
  });
  useEffect(() => {
    setEditForm({
      title: obj?.title || "",
      tags: obj?.tags?.join(", ") || "",
      content: obj?.content || "",
    });
  }, [obj]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };
  const updateFields = (field) => {
    setEditFields((prevFields) => {
      const fieldExists = prevFields.includes(field);
      if (fieldExists) {
        return prevFields.filter((item) => item !== field);
      }
      return [...prevFields, field];
    });
  };

  const handleSave = (field) => {
    if (!editForm[field]?.trim()) {
      alert("Field cannot be empty");
      return;
    }
    dispatchNotes({
      type: "EDIT_NOTE",
      payload: {
        editNoteId: obj.id,
        title: editForm.title,
        tags: editForm.tags.split(",").map((tag) => tag.trim()),
        content: editForm.content,
        lastEdited: new Date().toISOString(),
      },
    });
    updateFields(field);
  };
  const lastEdited = obj?.lastEdited;
  const formattedDate = new Date(lastEdited).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="detailed-note-container">
      
      <header className="detailed-note-header">
        {editFields.includes("title") ? (
          <fieldset className="note-field edit">
            <input
              type="text"
              name="title"
              value={editForm.title}
              onChange={handleChange}
              className="title-input edit"
            />
            <div className="edit-cta">
              <button
                type="button"
                className="edit-btn save"
                onClick={() => {
                  handleSave("title");
                }}
              >
                <Check />
              </button>
              <button
                type="button"
                className="edit-btn cancel"
                onClick={() => updateFields("title")}
              >
                <Close />
              </button>
            </div>
          </fieldset>
        ) : (
          <h2
            className="detailed-note-title"
            onClick={() => updateFields("title")}
          >
            {obj?.title}
          </h2>
        )}
        {editFields.includes("tags") ? (
          <fieldset className="note-field edit">
            <input
              type="text"
              name="tags"
              value={editForm.tags}
              onChange={handleChange}
              className="tags-input edit"
            />
            <div className="edit-cta">
              <button
                type="button"
                className="edit-btn save"
                onClick={() => {
                  handleSave("tags");
                }}
              >
                <Check />
              </button>
              <button
                type="button"
                className="edit-btn cancel"
                onClick={() => updateFields("tags")}
              >
                <Close />
              </button>
            </div>
          </fieldset>
        ) : (
          <div
            className="detailed-tags-list"
            onClick={() => updateFields("tags")}
          >
            <span className="detailed-tag-text">
              <LocalOfferOutlined /> Tags
            </span>
            <span className="detailed-tags">{obj?.tags.join(", ")}</span>
          </div>
        )}

        <div className="detailed-time-edited">
          <span className="detailed-time-text">
            <AccessTimeFilledOutlined /> Last Edited
          </span>

          <span className="detailed-time">{formattedDate}</span>
        </div>
      </header>

      {editFields.includes("content") ? (
        <fieldset className="note-field edit-content">
          <textarea
            type="text"
            name="content"
            value={editForm.content}
            onChange={handleChange}
            className="textarea-input edit"
          />
          <div className="edit-cta content">
            <button
              type="button"
              className="edit-btn save"
              onClick={() => {
                handleSave("content");
              }}
            >
              <Check />
            </button>
            <button
              type="button"
              className="edit-btn cancel"
              onClick={() => updateFields("content")}
            >
              <Close />
            </button>
          </div>
        </fieldset>
      ) : (
        <div
          className="detailed-note-content"
          onClick={() => updateFields("content")}
        >
          <pre className="content-text">{obj?.content}</pre>
          {/* <p ></p> */}
        </div>
      )}
    </div>
  );
}

export default DetailedNote;
