import React, { useContext, useEffect } from "react";
import TabNav from "../TabNav";
import { LightMode, TextFields } from "@mui/icons-material";
import ThemeOptions from "./ThemeOptions";
import "./settings.css"
import { DataContext } from "../../App";

function SettingsPage() {
  const{notes} = useContext(DataContext)
  const settingsData = [
    { id: "colorTheme", text: "Color Theme", icon: LightMode },
    { id: "fontTheme", text: "Font Theme", icon: TextFields },
  ];
   useEffect(() => {
    localStorage.setItem("fontTheme", JSON.stringify(notes?.fontTheme));
    localStorage.setItem("colorTheme", JSON.stringify(notes?.colorTheme));
  }, [notes?.fontTheme, notes?.colorTheme]);
  return (
    <div className="settings-wrapper">
      <nav className="settings-nav">
        <ul className="settings-list">
          <TabNav data={settingsData} tabKey="settingsCurrentTab" />
        </ul>
      </nav>
      <ThemeOptions/>
    </div>
  );
}

export default SettingsPage;
