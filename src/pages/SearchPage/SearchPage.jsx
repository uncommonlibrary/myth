import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getData } from "../../services/searchService.js";
import { useLocation, useNavigate } from "react-router-dom";
import { addToTBR, addToLibrary } from "../../services/tbrService.js";

export default function SearchPage() {
  const [result, setResult] = useState({});
  const [displayQuery, setDisplayQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleAddBookToTBR = async (book) => {
    await addToTBR(book);
  };

  const handleAddBookToLibrary = async (book) => {
    await addToLibrary(book);
  };

  const handleMoreInfo = (key, editionKey) => {
    navigate(`/book/${encodeURIComponent(key)}`, { state: {editionKey: editionKey} }); //need this encodeURIcomponent to remove the extra slash from key
  };

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Searched for: "{displayQuery}"</h1>
      {/* Checks if result.docs is avail or still being fetched */}
      {result.docs ? (
        <>
          <h2>Found {result.numFound} result(s)</h2>
          {result.docs.map((book, index) => (
            <div key={index}>
              <h3>Title: {book.title}</h3>
              <h4>Author: {book.author_name?.[0]}</h4>
              <button onClick={() => handleAddBookToTBR(book)}>
                Add to TBR
              </button>
              <button onClick={() => handleAddBookToLibrary(book)}>
                Add to Library
              </button>
              <button
                onClick={() => handleMoreInfo(book.key, book.edition_key[0])}
              >
                More Info
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>Searching...</p>
      )}
    </>
  );
}
