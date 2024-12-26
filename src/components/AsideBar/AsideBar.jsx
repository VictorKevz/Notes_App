import React, { useContext } from "react";
import logo from "../../assets/images/logo.svg";
import { ArchiveOutlined, HomeOutlined, LocalOfferOutlined, Settings } from "@mui/icons-material";
import TagList from "../TagList";
import "./asideBar.css";
import { DataContext } from "../../App";
import TabNav from "../TabNav";

function AsideBar() {
  const { notes, dispatchNotes } = useContext(DataContext);

  const headerLinks = [
    { id: "allNotes", text: "All Notes", icon: HomeOutlined },
    { id: "archivedNotes", text: "Archived Notes", icon: ArchiveOutlined },
    { id: "tags", text: "Tags", icon: LocalOfferOutlined },
    { id: "settingsTab", text: "Settings", icon: Settings },
  ];
  return (
    <aside className="aside-wrapper mobile">
      <header className="aside-header desktop">
        <img src={logo} alt="Notes App logo" className="logo" />
      </header>
      <nav className="aside-nav mobile">
        <ul className="links-wrapper desktop">
          <TabNav data={headerLinks.slice(0,2)} tabKey="asideCurrentTab" />
          <li className="tags-list-item">
            <TagList />
          </li>
        </ul>
        <ul className="links-wrapper mobile">
          <TabNav data={headerLinks} tabKey="asideCurrentTab" />
          {/* <li className="tags-list-item"> 
          </li> */}
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBar;
