import { DarkMode, LightMode } from "@mui/icons-material";
import React, { useContext } from "react";
import { DataContext } from "../../App";

function ThemeOptions() {
  const { notes } = useContext(DataContext);
  const themeData = {
    colorTheme: {
      id: "colorTheme",
      text: "Color Theme",
      parag: "Choose your color theme",
      options: [
        {
          id: "lightMode",
          icon: LightMode,
          label: "Light Mode",
          parag: "Pick a clean and classic light theme",
        },
        {
          id: "darkMode",
          icon: DarkMode,
          label: "Dark Mode",
          parag: "Select a sleek and modern dark theme",
        },
        // {
        //   id: "lightMode",
        //   icon: LightMode,
        //   label: "Light Mode",
        //   parag: "Pick a clean and classic light theme",
        // },
      ],
    },
    fontTheme: {
      id: "fontTheme",
      text: "Font Theme",
      parag: "Choose your font theme:",
      options: [
        {
          id: "'Inter', serif",
          text: "Aa",
          label: "Sans-serif",
          parag: "Clean and modern, easy to read.",
        },
        {
          id: "'Noto Serif', serif",
          text: "Aa",
          label: "Serif",
          parag: "Classic and elegant for a timeless feel.",
        },
        {
          id: "'Source Code Pro', serif",
          text: "Aa",
          label: "Monospace",
          parag: "Code-like, great for a technical vibe.",
        },
      ],
    },
  };
  const obj = themeData[notes.settingsCurrentTab];
  return (
    <article className="theme-options-wrapper">
      <header className="theme-options-header">
        <h3 className="theme-title">{obj.text}</h3>
        <p className="theme-parag">{obj.parag}</p>
      </header>
      <ul className="theme-options-list">
        {obj.options.map((option) => {
          return (
            <li className="theme-option-item">
              <button type="button" className="theme-option-btn">
                <span className="left-side-wrapper">
                  <span className="icon-wrapper">
                    {obj.id === "colorTheme" ? <option.icon /> : option.text}
                  </span>
                  <span className="text-wrapper">
                    <h4 className="option-title">{option.label}</h4>
                    <p className="option-parag">{option.parag}</p>
                  </span>
                </span>
                <span className="right-icon"></span>
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

export default ThemeOptions;
