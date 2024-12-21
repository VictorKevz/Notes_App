import React, { useContext } from "react";
import { DataContext } from "../App";
import { KeyboardArrowRight } from "@mui/icons-material";

function TabNav({ data, tabKey }) {
  const { notes,dispatchNotes } = useContext(DataContext);
  return (
    <>
      {data.map((link) => {
        const isCurrent = link.id === notes[tabKey];
        return (
          <li key={link.id} className="link-item">
            <button
              type="button"
              className={`btn ${isCurrent && "current-link"}`}
              onClick={() => {
                dispatchNotes({
                  type: "UPDATE_TAB",
                  payload: { tab: link.id, key: tabKey },
                });
              }}
            >
              <span className="btn-text">
                <link.icon
                  className={`link-icon ${isCurrent && "current-icon"}`}
                />{" "}
                {link.text}
              </span>{" "}
              {isCurrent && <KeyboardArrowRight />}
            </button>
          </li>
        );
      })}
    </>
  );
}

export default TabNav;
 