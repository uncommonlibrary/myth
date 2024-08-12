import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getData } from "../../services/searchService.js";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const [result, setResult] = useState({});
  const [displayQuery, setDisplayQuery] = useState("");
  const location = useLocation();

  const loadResult = async () => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      setDisplayQuery(query);
      const data = await getData(query);
      setResult(data);
    }
  };

  useEffect(() => {
    loadResult();
  }, [location.search]);

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Searched for: "{displayQuery}"</h1>
      {/* Checks if result.docs is avail or still being fetched */}
      {result.docs ? (
        <>
          <h2>Book: {result.numFound}</h2>
          <h2>Title: {result.docs[0]?.title}</h2>
          <h2>Author: {result.docs[0]?.author_name?.[0]}</h2>
          <button>Add to TBR</button>
          <button>Add to Library</button>
        </>
      ) : (
        <p>Searching...</p>
      )}
    </>
  );
}
