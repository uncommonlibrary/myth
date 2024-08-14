import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar () {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/shelves/tbr">TBR</Link>
        </li>
        <li>
          <Link to="/shelves/library">Library</Link>
        </li>
        <li>
          <Link to="/shelves/archive">Archive</Link>
        </li>
      </ul>
    </nav>
  );
};
