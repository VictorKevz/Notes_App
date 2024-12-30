import React, { useContext } from "react";
import { DataContext } from "../../App";
import "./modal.css";
import { FocusTrap } from "focus-trap-react";
import { motion } from "framer-motion";
import { detailedVariants } from "../../variants";

function WarningModal() {
  const { dispatchNotes, notes, isDark } = useContext(DataContext);
  const { typeText, parag, modalTitle } = notes.modalData;

  const isDelete = modalTitle === "Delete Note";
  return (
    <div
      className="modal-wrapper"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      aria-modal="true"
    >
      <FocusTrap>
      <motion.article 
      className={`modal-container ${isDark && "dark-modal-bg"}`}
      variants={detailedVariants}
      initial="initial"
      animate="animate"
      key={notes.modalData.modalId}
      >
        <header className={`modal-header ${isDark && "dark-bb"}`}>
          <div
            className={`modal-icon-wrapper ${isDark && "dark-btn"}`}
            aria-hidden="true"
          >
            {notes.modalData.icon && (
              <notes.modalData.icon fontSize="large" className="modal-icon" />
            )}
          </div>
          <div className="modal-text">
            <h3 id="modal-title" className="modal-title">
              {modalTitle}
            </h3>
            <p
              id="modal-description"
              className={`modal-parag ${isDark && "dark-text-secondary"}`}
            >
              {parag}
            </p>
          </div>
        </header>
        <footer className="modal-cta">
          <button
            type="button"
            className="modal-btn"
            onClick={() => dispatchNotes({ type: "CLOSE_MODAL" })}
            aria-label="Cancel and close the modal"
          >
            Cancel
          </button>
          <button
            type="button"
            className={`modal-btn ${isDelete ? "delete" : "archive"} ${
              isDark && "dark-btn"
            }`}
            onClick={() => dispatchNotes({ type: `${typeText}` })}
            aria-label={`${modalTitle} confirmation`}
          >
            {modalTitle}
          </button>
        </footer>
      </motion.article>
      </FocusTrap>
    </div>
  );
}

export default WarningModal;
