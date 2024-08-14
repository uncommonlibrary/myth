import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { fetchAllBooks } from "../../services/tbrService";
import ArchiveShelf from "../../components/ArchiveShelf/ArchiveShelf";
import TBRShelf from "../../components/TBRShelf/TBRShelf";
import LibraryShelf from "../../components/LibraryShelf/LibraryShelf";
import { useEffect, useState } from "react";

const url = "https://api.airtable.com/v0/app39xSNujiUrbaTR/Table%201"; //url for user name
const urlKey = `${import.meta.env.VITE_APIKEY}`;

export default function HomePage() {
  const [name, setName] = useState("reader");
  const [books, setBooks] = useState([]);

  //fetching user's name
  useEffect(() => {
    const displayName = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${urlKey}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const records = json.records;
        const sortedRecords = records.sort(
          (a, b) => new Date(b.createdTime) - new Date(a.createdTime)
        ); //if a is earlier, then number will be positive bc b > a
        setName(sortedRecords[0].fields.name);
        console.log("recent record:", sortedRecords[0].fields.name);
      } catch (error) {
        console.error(error.message);
      }
    };
    displayName();
  }, []);

  useEffect(() => {
    const displayBooks = async () => {
      const data = await fetchAllBooks();
      console.log("All Books", data);
      const shelves = {
        library: data.filter((book) => book.fields.location === "library"),
        tbr: data.filter((book) => book.fields.location === "tbr"),
        archive: data.filter((book) => book.fields.location === "archive"),
      };
      setBooks(shelves);
    };
    displayBooks();
  }, []);

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Welcome, {name}!</h1>
      <h3>What are you reading today?</h3>
      <h1>Your Library</h1>
      <LibraryShelf books={books.library} />
      <h1>TBR Shelf</h1>
      <TBRShelf books={books.tbr} />
      <h1>Your Archive</h1>
      <ArchiveShelf books={books.archive} />
    </>
  );
}
