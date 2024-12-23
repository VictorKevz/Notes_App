import React, { useContext } from "react";
import { DataContext } from "../../App";
import { AccessTimeOutlined, SellOutlined } from "@mui/icons-material";
import "./noteForm.css";
function NoteForm() {
  const { notes, dispatchNotes } = useContext(DataContext);
  const { title, tags, content } = notes.form;
  const {
    title: validTitle,
    tags: validTags,
    content: validContent,
  } = notes.isValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchNotes({ type: "UPDATE_FORM", payload: { name, value } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatchNotes({
        type: "CREATE_NOTE",
        payload: {
          title,
          tags: tags.split(",").map((tag) => tag.trim()),
          content,
        },
      });
    } else {
      return;
    }
  };

  const validateForm = () => {
    const newFormValid = { ...notes.isValid };
    if (title.trim() === "") {
      newFormValid.title = false;
    }
    if (tags.trim() === "") {
      newFormValid.tags = false;
    }
    if (content.trim() === "") {
      newFormValid.content = false;
    }
    dispatchNotes({
      type: "VALIDATE_FORM",
      payload: { isValid: newFormValid },
    });
    const isValid = Object.values(newFormValid).every(Boolean);
    return isValid;
  };
  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <fieldset className="note-form-field">
        <label htmlFor="title" className="title-label">
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleChange}
            name="title"
            placeholder="Enter a title..."
            className="title-input"
          />
        </label>
        {!validTitle && (
          <span className="error-message">Provide a valid title</span>
        )}
      </fieldset>
      <div className="tags-lastEdited-wrapper">
        <fieldset className="note-form-field">
          <label htmlFor="tags" className="tag-label">
            <SellOutlined />
            Tags
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={handleChange}
            name="tags"
            placeholder="Add tags separated by commas (e.g. Work, Planning)"
            className="tags-input"
          />
          {!validTags && (
            <span className="error-message">Provide valid tags</span>
          )}
        </fieldset>
        <div className="lastEdited">
          <span className="tag-label">
            <AccessTimeOutlined /> Last Edited
          </span>
          <p className="lastEdited-text">Not yet saved</p>
        </div>
      </div>
      <fieldset className="note-form-field content">
        <textarea
          name="content"
          value={content}
          onChange={handleChange}
          id="content"
          className="textarea-input"
          placeholder="Start typing your note here…"
        />
                {!validContent && <span className="error-message">Provide valid content!</span>}

      </fieldset>
      <fieldset className="form-btn-wrapper">
        <button type="submit" className="form-btn save">
          Save Note
        </button>
        <button
          type="button"
          className="form-btn cancel"
          onClick={() => dispatchNotes({ type: "HIDE_FORM" })}
        >
          Cancel
        </button>
      </fieldset>
    </form>
  );
}

export default NoteForm;
