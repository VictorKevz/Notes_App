import {
  AccessTimeFilledOutlined,
  Check,
  Close,
  LocalOfferOutlined,
} from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import "./detailedNote.css";
import { DataContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import { detailedVariants } from "../../variants";

function DetailedNote() {
  const {
    dispatchNotes,
    searchResults,
    currentNoteObj: obj,
    isDark,
  } = useContext(DataContext);
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
    <>
      {searchResults?.length > 0 ? (
        <AnimatePresence>
        <motion.div className="detailed-note-container"
        variants={detailedVariants}
        initial="initial"
        animate="animate"
        key={obj?.id}
        >
          <header className={`detailed-note-header ${isDark && "dark-bb"}`}>
            {editFields.includes("title") ? (
              <fieldset className="note-field edit">
                <legend className="sr-only">Edit Title</legend>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleChange}
                  className="title-input edit"
                  aria-label="Edit title"
                />
                <div className="edit-cta">
                  <button
                    type="button"
                    className="edit-btn save"
                    onClick={() => handleSave("title")}
                    aria-label="Save title"
                  >
                    <Check />
                  </button>
                  <button
                    type="button"
                    className="edit-btn cancel"
                    onClick={() => updateFields("title")}
                    aria-label="Cancel editing title"
                  >
                    <Close />
                  </button>
                </div>
              </fieldset>
            ) : (
              <h2
                className="detailed-note-title"
                onClick={() => updateFields("title")}
                tabIndex={0}
                role="button"
                aria-label="Edit title"
              >
                {obj?.title}
              </h2>
            )}
            {editFields.includes("tags") ? (
              <fieldset className="note-field edit">
                <legend className="sr-only">Edit Tags</legend>
                <input
                  type="text"
                  name="tags"
                  value={editForm.tags}
                  onChange={handleChange}
                  className="tags-input edit"
                  aria-label="Edit tags"
                />
                <div className="edit-cta">
                  <button
                    type="button"
                    className="edit-btn save"
                    onClick={() => handleSave("tags")}
                    aria-label="Save tags"
                  >
                    <Check />
                  </button>
                  <button
                    type="button"
                    className="edit-btn cancel"
                    onClick={() => updateFields("tags")}
                    aria-label="Cancel editing tags"
                  >
                    <Close />
                  </button>
                </div>
              </fieldset>
            ) : (
              <div
                className="detailed-tags-list"
                onClick={() => updateFields("tags")}
                tabIndex={0}
                role="button"
                aria-label="Edit tags"
              >
                <span className="detailed-tag-text">
                  <LocalOfferOutlined aria-hidden="true" /> Tags
                </span>
                <span className="detailed-tags">{obj?.tags.join(", ")}</span>
              </div>
            )}

            <div className="detailed-time-edited">
              <span className="detailed-time-text">
                <AccessTimeFilledOutlined aria-hidden="true" /> Last Edited
              </span>
              <span className="detailed-time">{formattedDate}</span>
            </div>
          </header>

          {editFields.includes("content") ? (
            <fieldset className="note-field edit-content">
              <legend className="sr-only">Edit Content</legend>
              <textarea
                type="text"
                name="content"
                value={editForm.content}
                onChange={handleChange}
                className="textarea-input edit"
                aria-label="Edit content"
              />
              <div className="edit-cta content">
                <button
                  type="button"
                  className="edit-btn save"
                  onClick={() => handleSave("content")}
                  aria-label="Save content"
                >
                  <Check />
                </button>
                <button
                  type="button"
                  className="edit-btn cancel"
                  onClick={() => updateFields("content")}
                  aria-label="Cancel editing content"
                >
                  <Close />
                </button>
              </div>
            </fieldset>
          ) : (
            <div
              className="detailed-note-content"
              onClick={() => updateFields("content")}
              tabIndex={0}
              role="button"
              aria-label="Edit content"
            >
              <pre className="content-text">{obj?.content}</pre>
            </div>
          )}
        </motion.div>
        </AnimatePresence>
      ) : (
        <motion.p className="no-notes-text"
        variants={detailedVariants}
        animate="animate"
        >
          You don’t have any notes available in this tab. Start a new note to capture your
          thoughts and ideas.
        </motion.p>
      )}
    </>
  );
}

export default DetailedNote;
