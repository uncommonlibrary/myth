import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { deleteFromTBR, moveToLibrary } from "../../services/tbrService";

const urlTBR = "https://api.airtable.com/v0/app80K0OB0akZ36aN/Table%201";
const urlKeyTBR = `${import.meta.env.VITE_APIKEY}`;

export default function TBRPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(urlTBR, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${urlKeyTBR}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const records = json.records;
        const tbrBooks = records.filter((record) => record.fields.location === "tbr")
        setBooks(tbrBooks);
        console.log("Shelf:", records);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (recordID) => {
    setBooks(books.filter((book) => book.id !== recordID));
    await deleteFromTBR(recordID); //this deletes from TBR airtable
  };

  const handleMoveToLibrary = async (recordID) => {
    console.log("book ID:", recordID)
    await moveToLibrary(recordID);
    setBooks(books.filter((book) => book.id !== recordID));
  }

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>TBR Shelf</h1>
      <>
        {books.map((book) => (
          <div key={book.fields.editionKey}>
            <h2>Title: {book.fields.title}</h2>
            <h3>Author: {book.fields.author}</h3>
            <button onClick={() => handleMoveToLibrary(book.id)}>Move to Library</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))}
      </>
    </>
  );
}
