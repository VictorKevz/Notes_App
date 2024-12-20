import React, { useContext } from "react";
import logo from "../../assets/images/logo.svg";
import { ArchiveOutlined, HomeOutlined } from "@mui/icons-material";
import TagList from "../TagList";
import "./asideBar.css";
import { DataContext } from "../../App";



function AsideBar() {
  const{notes, dispatchNotes} = useContext(DataContext)
  return (
    <aside className="aside-wrapper">
      <header className="aside-header">
        <img src={logo} alt="Notes App logo" className="logo" />
      </header>
      <nav className="aside-nav">
        <ul className="links-wrapper">
          <li className="link-item">
            <button type="button" className="home" onClick={()=>{
              dispatchNotes({type:"UPDATE_TAB",payload:{tab:"allNotes"}})
            }}>
              <HomeOutlined /> All Notes
            </button>
          </li>
          <li className="link-item">
            <button type="button" className="home" onClick={()=>{
              dispatchNotes({type:"UPDATE_TAB",payload:{tab:"archivedNotes"}})
            }}>
              <ArchiveOutlined /> Archived Notes
            </button>
          </li>
          <li className="tags-list-item">
            <TagList/>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default AsideBar;
