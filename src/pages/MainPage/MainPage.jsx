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
            src="https://www.dropbox.com/scl/fi/ee87102852eux1qfr80gj/trackreading.png?rlkey=jhizi4mzpb5y5917cxxqsu3zz&st=4o7s3pik&dl=0"
            alt="A girl reading"
          />
          <h2>Track your reading</h2>
          <h3>
            Monitor your reading progress and mark books as read, currently
            reading, or to-be-read.
          </h3>
        </div>
        <div id="feature2">
          <img
            src="https://www.dropbox.com/scl/fi/wwg6e4soqyfrn39u9yto3/write_notes.png?rlkey=mh7cbhlrt1sl9eyu90z3lw0pg&st=q9w9gsum&dl=0"
            alt="A notebook"
          />
          <h2>Write notes</h2>
          <h3>
            Pen your thoughts and highlights as you read, keeping all your
            annotations in once place.
          </h3>
        </div>
        <div id="feature3">
          <img
            src="https://www.dropbox.com/scl/fi/4t3th95velshjieofihtm/sharelibrary.png?rlkey=sv4046lh5g29jsxcjjn8solxh&st=v4zzxxxb&dl=0"
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
