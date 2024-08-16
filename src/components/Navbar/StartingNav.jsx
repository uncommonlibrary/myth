import { Link } from "react-router-dom";
import "./StartingNav.css";

export default function StartingNav() {
  return (
    <div id="start-nav">
      <div id="myth-title"><h1>Myth</h1></div>
      <ul>
        <li id="loginlink">
          <Link to="/login">Log In</Link>
        </li>
        <li id="signuplink">
          <Link to="/login">Sign Up</Link>
        </li>
      </ul>
    </div>
  );
}
