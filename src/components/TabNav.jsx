import React, { useContext } from "react";
import { DataContext } from "../App";
import { KeyboardArrowRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import "./AsideBar/asideBar.css";
function TabNav({ data, tabKey }) {
  const { notes, dispatchNotes,isDark } = useContext(DataContext);
  return (
    <>
      {data.map((link) => {
  const isCurrent = link.id === notes[tabKey];
  const isSettingsTab = tabKey === "settingsCurrentTab";
  return (
    <li
      key={link.id}
      className={`link-item mobile ${isSettingsTab && "settings-item"}`}
    >
      <NavLink
        className={`btn ${isCurrent && "current-link"} ${
          isCurrent && isDark && "dark-card-bg"
        }`}
        onClick={() =>
          dispatchNotes({
            type: "UPDATE_TAB",
            payload: { tab: link.id, key: tabKey },
          })
        }
        to={isSettingsTab ? undefined : link.url}
        aria-current={isCurrent ? "page" : undefined}
        role={isSettingsTab ? "button" : undefined}
        tabIndex={isSettingsTab ? 0 : undefined}
        onKeyDown={(e) => {
          if (isSettingsTab && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            dispatchNotes({
              type: "UPDATE_TAB",
              payload: { tab: link.id, key: tabKey },
            });
          }
        }}
      >
        <span
          className={`btn-text ${
            !isSettingsTab && "mobile"
          }`}
        >
          <link.icon
            className={`link-icon ${isCurrent && "current-icon"}`}
            aria-hidden="true"
          />
          <span
            className={`nav-text ${
              isSettingsTab && "settings-text"
            }`}
          >
            {link.text}
          </span>
        </span>
        {isCurrent && (
          <KeyboardArrowRight
            className="arrow mobile"
            aria-hidden="true"
          />
        )}
      </NavLink>
    </li>
  );
})}
    </>
  );
}

export default TabNav;
