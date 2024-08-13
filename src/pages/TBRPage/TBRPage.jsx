import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { deleteFromTBR } from "../../services/tbrService";

const urlTBR = "https://api.airtable.com/v0/app80K0OB0akZ36aN/Table%201";
const urlKeyTBR =
  "patEpEsxTz3CTwZIw.bc945ee535bb3b899ca5312e1fc695491b658d07e020efe888aff4a1ba4f518c";

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
        setBooks(records);
        console.log(records);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchBooks();
  }, []);

  const handleDelete = async (recordID) => {
    setBooks(books.filter((book) => book.id !== recordID));
    await deleteFromTBR(recordID);
  };

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
            <button>Move to Library</button>
            <button onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))}
      </>
    </>
  );
}
