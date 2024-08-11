import "./SearchBar.css";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };
  return (
    <>
      <form>
        <div className="wrapper">
          <label htmlFor="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleChange}
            />
            <img
              id="searchIcon"
              width="24"
              height="24"
              src="https://img.icons8.com/material-two-tone/24/search.png"
              alt="search"
            />
          </label>
        </div>
      </form>
    </>
  );
}
