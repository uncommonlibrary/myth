import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { deleteFromTBR, moveToLibrary } from "../../services/tbrService";

const urlTBR = "https://api.airtable.com/v0/app80K0OB0akZ36aN/Table%201";
const urlKeyTBR = `${import.meta.env.VITE_APIKEY}`;
const COVER_URL = "https://covers.openlibrary.org/b/id/";

export default function TBRPage() {
  const [books, setBooks] = useState([]);
  const [bookStatus, setBookStatus] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${urlTBR}?fields%5B%5D=editionKey&fields%5B%5D=title&fields%5B%5D=author&fields%5B%5D=coverImage&fields%5B%5D=location&filterByFormula=location%3D%22tbr%22&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${urlKeyTBR}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const records = json.records;
        setBooks(records);
        console.log("Shelf:", records);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (recordID) => {
    setBookStatus((prevStatus) => ({
      ...prevStatus,
      [recordID]: { ...prevStatus[recordID], isDeleted: true },
    }));
    await deleteFromTBR(recordID); //this deletes from TBR airtable
    setBooks(books.filter((book) => book.id !== recordID));
  };

  const handleMoveToLibrary = async (recordID) => {
    console.log("book ID:", recordID);
    setBookStatus((prevStatus) => ({
      ...prevStatus,
      [recordID]: { ...prevStatus[recordID], isReading: true },
    }));
    await moveToLibrary(recordID);
    setBooks(books.filter((book) => book.id !== recordID));
  };

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>TBR Shelf</h1>
      {books.length > 0 ? (
        <>
          {books.map((book, index) => (
            <div key={index}>
              <img src={`${COVER_URL}${book.fields.coverImage}.jpg`} />
              <h2>Title: {book.fields.title}</h2>
              <h3>Author: {book.fields.author}</h3>
              <button onClick={() => handleMoveToLibrary(book.id)}>
                {bookStatus[book.id]?.isReading
                  ? "Moved to Library!"
                  : "Currently Reading"}
              </button>
              <button onClick={() => handleDelete(book.id)}>
                {bookStatus[book.id]?.isDeleted ? "Deleted!" : "Delete"}
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>*crickets*</p>
      )}
    </>
  );
}
