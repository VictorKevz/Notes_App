import { AccessTimeFilledOutlined, LocalOfferOutlined } from "@mui/icons-material";
import React from "react";

function DetailedNote({obj}) {
    const lastEdited = obj?.lastEdited;
const formattedDate = new Date(lastEdited).toLocaleDateString("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
  return (
    <div className="detailed-note-container">
      <header className="detailed-note-header">
        <h2 className="detailed-note-title">{obj?.title}</h2>
        <p className="tags"><LocalOfferOutlined/> Tags <span className="tag">{obj?.tags.join(", ")}</span></p>
        <p className="timeEdited"><AccessTimeFilledOutlined/> Last Edited <span className="tag">{formattedDate}</span></p>
      </header>
      <div className="detailed-note-content">
        <p className="content-title">{obj?.content?.split("\n")[0]}</p>
      </div>
    </div>
  );
}

export default DetailedNote;
