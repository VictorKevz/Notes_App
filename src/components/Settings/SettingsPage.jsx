import React, { useContext, useEffect } from "react";
import TabNav from "../TabNav";
import { LightMode, TextFields } from "@mui/icons-material";
import ThemeOptions from "./ThemeOptions";
import "./settings.css"
import { DataContext } from "../../App";

function SettingsPage() {
  const{notes,isTablet,isDark} = useContext(DataContext)
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
      {isTablet && <h1 className="main-title settings-title">Settings</h1>}
      <nav className={`settings-nav ${isDark && "dark-br"}`}>
        <ul className="settings-list">
          <TabNav data={settingsData} tabKey="settingsCurrentTab" />
        </ul>
        
      </nav>
      {isTablet && <div className="divider"></div>}
      <ThemeOptions/>
    </div>
  );
}

export default SettingsPage;
