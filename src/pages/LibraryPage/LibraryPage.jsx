import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { deleteFromTBR } from "../../services/tbrService";

const urlLibrary = "https://api.airtable.com/v0/app80K0OB0akZ36aN/Table%201";
const urlKeyLibrary = `${import.meta.env.VITE_APIKEY}`;

export default function LibraryPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `${urlLibrary}?fields%5B%5D=title&fields%5B%5D=author&filterByFormula=location%3D%22library%22&sort%5B0%5D%5Bfield%5D=title&sort%5B0%5D%5Bdirection%5D=asc`,
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

  const handleDelete = async (recordID) => {
    setBooks(books.filter((book) => book.id !== recordID));
    await deleteFromTBR(recordID); //this deletes from Shelves Airtable
  };

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Your Library</h1>
      <>
        {books.map((book, index) => (
          <div key={index}>
            <h2>Title: {book.fields.title}</h2>
            <h3>Author: {book.fields.author}</h3>
            <button>Mark as Read</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))}
      </>
    </>
  );
}
