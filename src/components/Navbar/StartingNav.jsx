import { Link } from "react-router-dom";
import "./Navbar.css";

export default function StartingNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/login">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
}
