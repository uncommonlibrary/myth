import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getData } from "../../services/searchService.js";
import { useLocation } from "react-router-dom";
import { addToTBR } from "../../services/tbrService.js";

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

  //this should send selected book to TBR shelf in airtable
  // const handleAddToTBR = async (book) => {
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${urlKey}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         records: [
  //           {
  //             fields: {
  //               editionKey: book.edition_key[0],
  //               title: book.title,
  //               author: book.author_name?.[0],
  //               coverEditionKey: book.cover_edition_key,
  //             },
  //           },
  //         ],
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error(`Response status: ${response.status}`);
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleAddBookToTBR = async (book) => {
    await addToTBR(book);
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
          {/* <h2>Title: {result.docs[0]?.title}</h2>
          <h2>Author: {result.docs[0]?.author_name?.[0]}</h2> */}
          {result.docs.map((book) => (
            <div key={book.edition_key[0]}>
              <h3>Title: {book.title}</h3>
              <h4>Author: {book.author_name?.[0]}</h4>
              <button onClick={() => handleAddBookToTBR(book)}>
                Add to TBR
              </button>
              <button>Add to Library</button>
            </div>
          ))}
        </>
      ) : (
        <p>Searching...</p>
      )}
    </>
  );
}
