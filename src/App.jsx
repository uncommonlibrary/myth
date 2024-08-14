import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
/* PAGES */
import MainPage from "./pages/MainPage/MainPage";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import TBRPage from "./pages/TBRPage/TBRPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import ArchivePage from "./pages/ArchivePage/ArchivePage";
import LoginPage from "./pages/LoginPage/LoginPage";

export async function getData() {
  const BASE_URL = "https://openlibrary.org/search.json?q=kazuo+ishiguro";

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export default function App() {
  const [book, setBook] = useState({});

  const loadBook = async () => {
    const data = await getData();
    setBook(data);
  };

  useEffect(() => {
    loadBook();
  }, []);

  //INSERT COMPONENTS BELOW
  return (
    <>
      <h1>MYTH</h1>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/shelves/tbr" element={<TBRPage />} />
        <Route path="/shelves/library" element={<LibraryPage />} />
        <Route path="/shelves/archive" element={<ArchivePage />} />
        {/*MISSING JOURNAL PAGE - to be added later if possible */}
      </Routes>
      {/* <h1>Author: {JSON.stringify(result.docs)}</h1> */}
      <h2>Number: {book.numFound}</h2>
    </>
  );
}
