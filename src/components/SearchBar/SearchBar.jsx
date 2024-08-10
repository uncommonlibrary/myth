import "./SearchBar.css";

export default function SearchBar() {
  return (
    <>
      <div className="wrapper">
        <label htmlFor="search-bar">
          <input type="text" />
          <img
            id="searchIcon"
            width="24"
            height="24"
            src="https://img.icons8.com/material-two-tone/24/search.png"
            alt="search"
          />
        </label>
      </div>
    </>
  );
}
