import React, { useContext } from "react";
import { DataContext } from "../../App";
import "./modal.css"
function WarningModal() {
  const { dispatchNotes, notes,isDark } = useContext(DataContext);
  const{ typeText, parag, modalTitle } = notes.modalData

  const isDelete = modalTitle === "Delete Note"
  return (
    <div className="modal-wrapper">
      <article className={`modal-container ${isDark && "dark-modal-bg"}`}>
        <header className={`modal-header ${isDark && "dark-bb"}`}>
          <span className={`modal-icon-wrapper ${isDark && "dark-btn"}`}>< notes.modalData.icon fontSize="large" className="modal-icon"/></span>
          <div className="modal-text">
            <h3 className="modal-title">{modalTitle}</h3>
            <p className={`modal-parag ${isDark && "dark-text-secondary"}`}>{parag}</p>
          </div>
        </header>
        <div className="modal-cta">
          <button
            type="button" className="modal-btn"
            onClick={() => dispatchNotes({ type: "CLOSE_MODAL" })}
          >
            Cancel
          </button>
          <button type="button" 
          className={`modal-btn ${isDelete ? "delete":"archive"} ${isDark && "dark-btn"}`}
          onClick={() => dispatchNotes({ type: `${typeText}` })}

          >{modalTitle}</button>
        </div>
      </article>
    </div>
  );
}

export default WarningModal;
