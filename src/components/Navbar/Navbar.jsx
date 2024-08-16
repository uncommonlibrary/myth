import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar () {
  return (
    <div id="main-nav">
      <h1>Myth</h1>
      <ul id="main-links">
        <li id="homelink">
          <Link to="/home">Home</Link>
        </li>
        <li id="tbrlink">
          <Link to="/shelves/tbr">TBR</Link>
        </li>
        <li id="librarylink">
          <Link to="/shelves/library">Library</Link>
        </li>
        <li id="archivelink">
          <Link to="/shelves/archive">Archive</Link>
        </li>
      </ul>
    </div>
  );
};
