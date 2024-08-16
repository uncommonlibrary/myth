import StartingNav from "../../components/Navbar/StartingNav";
import { Link } from "react-router-dom";
import "./MainPage.css";

export default function MainPage() {
  return (
    <div id="main-container">
      <StartingNav />
      <div className="main-banner">
        <h1>Maintain your own library and share them with friends.</h1>
        <h3 id="description">
          A simple reading web app for readers who just want to log stuff.
        </h3>
        <h3>No clunk. Just books.</h3>
        <button>
          <Link to="/login">Get started</Link>
        </button>
      </div>
      <div className="features">
        <div id="feature1">
          <img
            src="./src/assets/images/trackreading.png"
            alt="A girl reading"
          />
          <h2>Track your reading</h2>
          <h3>
            Monitor your reading progress and mark books as read, currently
            reading, or to-be-read.
          </h3>
        </div>
        <div id="feature2">
          <img src="./src/assets/images/write_notes.png" alt="A notebook" />
          <h2>Write notes</h2>
          <h3>
            Pen your thoughts and highlights as you read, keeping all your
            annotations in once place.
          </h3>
        </div>
        <div id="feature3">
          <img
            src="./src/assets/images/sharelibrary.png"
            alt="Two characters trading books"
          />
          <h2>Share your library</h2>
          <h3>
            Showcase your collection with your friends, and discover what others
            are reading.
          </h3>
        </div>
      </div>
    </div>
  );
}
