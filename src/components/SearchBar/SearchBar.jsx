import "./SearchBar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/search");
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
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
