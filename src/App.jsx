import { useState, useEffect } from "react";
import "./App.css";

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

function App() {
  const [book, setBook] = useState({});

  const loadBook = async () => {
    const data = await getData();
    setBook(data);
  };

  useEffect(() => {
    loadBook();
  }, []);

  return (
    <>
      <h1>Author: {JSON.stringify(book.docs)}</h1>
      <h2>Number: {book.numFound}</h2>
    </>
  );
}

export default App;
