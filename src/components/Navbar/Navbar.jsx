import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/shelves/library">Library</Link>
        </li>
        <li>
          <Link to="/shelves/tbr">TBR</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
