import React, { useContext } from "react";
import { DataContext } from "../App";
import { KeyboardArrowRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

function TabNav({ data, tabKey }) {
  const { notes, dispatchNotes } = useContext(DataContext);
  return (
    <>
      {data.map((link) => {
        const isCurrent = link.id === notes[tabKey];
        return (
          <li key={link.id} className="link-item mobile">
            <NavLink
              // type="button"
              className={`btn ${isCurrent && "current-link"}`}
              onClick={() => {
                dispatchNotes({
                  type: "UPDATE_TAB",
                  payload: { tab: link.id, key: tabKey },
                });
              }}
              to={`${link.url}`}
            >
              <span className="btn-text">
                <link.icon
                  className={`link-icon ${isCurrent && "current-icon"}`}
                />
                <span className="nav-text mobile">{link.text}</span>
              </span>
              {isCurrent && <KeyboardArrowRight className="arrow mobile"/>}
            </NavLink>
          </li>
        );
      })}
    </>
  );
}

export default TabNav;
