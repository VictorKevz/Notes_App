import React from "react";
import TabNav from "../TabNav";
import { LightMode, TextFields } from "@mui/icons-material";
import ThemeOptions from "./ThemeOptions";
import "./settings.css"

function SettingsPage() {
  const settingsData = [
    { id: "colorTheme", text: "Color Theme", icon: LightMode },
    { id: "fontTheme", text: "Font Theme", icon: TextFields },
  ];
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
