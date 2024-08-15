import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { deleteFromTBR, moveToArchive } from "../../services/tbrService";

const urlLibrary = "https://api.airtable.com/v0/app80K0OB0akZ36aN/Table%201";
const urlKeyLibrary = `${import.meta.env.VITE_APIKEY}`;
const COVER_URL = "https://covers.openlibrary.org/b/id/";

export default function LibraryPage() {
  const [books, setBooks] = useState([]);
  const [bookStatus, setBookStatus] = useState({});

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${urlLibrary}?fields%5B%5D=editionKey&fields%5B%5D=title&fields%5B%5D=author&fields%5B%5D=coverImage&fields%5B%5D=location&filterByFormula=location%3D%22library%22&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${urlKeyLibrary}`,
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

  const handleMoveToArchive = async (recordID) => {
    console.log("book ID:", recordID);
    setBookStatus((prevStatus) => ({
      ...prevStatus,
      [recordID]: { ...prevStatus[recordID], markedAsRead: true },
    })); //this must come first or it wont transition properly
    await moveToArchive(recordID);
    setBooks(books.filter((book) => book.id !== recordID));
  };

  const handleDelete = async (recordID) => {
    setBookStatus((prevStatus) => ({
      ...prevStatus,
      [recordID]: { ...prevStatus[recordID], isDeleted: true },
    }));
    await deleteFromTBR(recordID); //this deletes from Shelves Airtable
    setBooks(books.filter((book) => book.id !== recordID));
  };

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Your Library</h1>
      {books.length > 0 ? (
        <>
          {books.map((book, index) => (
            <div key={index}>
              <img src={`${COVER_URL}${book.fields.coverImage}.jpg`} />
              <h2>Title: {book.fields.title}</h2>
              <h3>Author: {book.fields.author}</h3>
              <button onClick={() => handleMoveToArchive(book.id)}>
                {bookStatus[book.id]?.markedAsRead
                  ? "Moved to Archive!"
                  : "Mark as Read"}
              </button>
              <button onClick={() => handleDelete(book.id)}>
                {bookStatus[book.id]?.isDeleted ? "Deleted!" : "Delete"}
              </button>
            </div>
          ))}
        </>
      ) : (
        <p>Nothing here!</p>
      )}
    </>
  );
}
