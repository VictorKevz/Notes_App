import React, { useContext } from "react";
import logo from "../../assets/images/logo.svg";
import { ArchiveOutlined, HomeOutlined } from "@mui/icons-material";
import TagList from "../TagList";
import "./asideBar.css";
import { DataContext } from "../../App";
import TabNav from "../TabNav";

function AsideBar() {
  const { notes, dispatchNotes } = useContext(DataContext);

  const headerLinks = [
    { id: "allNotes", text: "All Notes", icon: HomeOutlined },
    { id: "archivedNotes", text: "Archived Notes", icon: ArchiveOutlined },
  ];
  return (
    <aside className="aside-wrapper">
      <header className="aside-header">
        <img src={logo} alt="Notes App logo" className="logo" />
      </header>
      <nav className="aside-nav">
        <ul className="links-wrapper">
          <TabNav data={headerLinks} tabKey="asideCurrentTab" />
          <li className="tags-list-item">
            <TagList />
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBar;
