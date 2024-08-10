import StartingNav from "../../components/Navbar/StartingNav";

export default function MainPage() {
  return (
    <>
      <StartingNav />
      <h1>Maintain your own library and share them with friends.</h1>
      <h3>A simple reading web app for readers who just want to log stuff.</h3>
      <h3>No clunk. Just books.</h3>
      <button>Get started</button>
      <div className="features">
        <div id="feature1">
          <p>image</p>
          <h2>Track your reading</h2>
          <h3>insert description</h3>
        </div>
        <div id="feature2">
          <p>image</p>
          <h2>Write notes</h2>
          <h3>insert description</h3>
        </div>
        <div id="feature3">
          <p>image</p>
          <h2>Share your library</h2>
          <h3>insert description</h3>
        </div>
      </div>
    </>
  );
}
