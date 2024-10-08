import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import {
  getDescription,
  getDataWithEdKey,
} from "../../services/bookDetailsService";
import { useLocation } from "react-router-dom";
import { addToTBR, addToLibrary } from "../../services/tbrService.js";
import "./BookDetailsPage.css";

const COVER_URL = "https://covers.openlibrary.org/b/id/";

export default function BookDetailsPage() {
  const [bookDetails, setBookDetails] = useState(null);
  const [result, setResult] = useState({ docs: [] });
  const [bookStatus, setBookStatus] = useState({
    isAddedToTBR: false,
    isAddedToLibrary: false,
  });
  const location = useLocation();
  const editionKey = location.state?.editionKey;
  console.log("EditionKey:", editionKey);

  const currentUrl = window.location.href; //https://stackoverflow.com/questions/4178578/how-to-get-url-from-browser-address-bar
  const decodeUrl = decodeURIComponent(currentUrl); //must decode url to get the book ID: https://www.geeksforgeeks.org/how-to-encode-and-decode-a-url-in-javascript/
  const bookId = decodeUrl.split("/").pop(); //splits string into array of substring and pops the last element which contains ID i need
  console.log("Book ID:", bookId);

  //to fetch book title, author, and other details (different from book description)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataWithEdKey(editionKey);
        setResult(data);
        console.log("Result:", result);
      } catch (error) {
        console.error(error.message);
        return "No book found";
      }
    };

    fetchData();
  }, [editionKey]);

  //this is to display book description
  const getBookDetails = async (bookId) => {
    const bookDescription = await getDescription(bookId); //receives the json
    setBookDetails(bookDescription);
    console.log("Book Deets:", bookDetails);
  };

  useEffect(() => {
    getBookDetails(bookId);
  }, [bookId]);

  const handleAddBookToTBR = async (book) => {
    setBookStatus((prevStatus) => ({
      ...prevStatus,
      [book.edition_key[0]]: {
        ...prevStatus[book.edition_key[0]],
        isAddedToTBR: true,
      },
    }));
    await addToTBR(book);
  };

  const handleAddBookToLibrary = async (book) => {
    setBookStatus((prevStatus) => ({
      ...prevStatus,
      [book.edition_key[0]]: {
        ...prevStatus[book.edition_key[0]],
        isAddedToLibrary: true,
      },
    }));
    await addToLibrary(book);
  };

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Book Details</h1>
      <div className="book-info">
        <div className="image-buttons">
          <img
            src={
              `${COVER_URL}${result.docs[0]?.cover_i}.jpg`
                ? `${COVER_URL}${result.docs[0]?.cover_i}.jpg`
                : null
            }
            alt={`${result.docs[0]?.title} cover`}
          />
          <p>
            {`${result.docs[0]?.cover_i}` ? "" : "No cover image available"}
          </p>
          <button onClick={() => handleAddBookToTBR(result.docs[0])}>
            {bookStatus[result.docs[0]?.edition_key[0]]?.isAddedToTBR
              ? "Added!"
              : "Add to TBR"}
          </button>
          <br />
          <button onClick={() => handleAddBookToLibrary(result.docs[0])}>
            {bookStatus[result.docs[0]?.edition_key[0]]?.isAddedToLibrary
              ? "Added!"
              : "Add to Library"}
          </button>
        </div>
        <div className="text-info">
          <h2>{result.docs[0]?.title}</h2>
          <h3>by {result.docs[0]?.author_name[0]}</h3>
          <p>
            {bookDetails?.description?.value ??
              bookDetails?.description ??
              "No description available"}
          </p>
          <p>
            <b>Genre: </b>
          </p>
          {result.docs[0]?.subject?.length > 0
            ? result.docs[0]?.subject?.slice(0, 5)?.map((genre, index) => (
                <div key={index}>
                  {genre}
                  {index < result.docs[0]?.subject?.slice(0, 5)?.length - 1 &&
                    ","}
                </div>
              ))
            : "No information available"}

          <p>
            <b>Average rating: </b>
            {result.docs[0]?.ratings_average !== undefined &&
            result.docs[0]?.ratings_average !== null
              ? Number(result.docs[0]?.ratings_average).toFixed(2) +
                " out of 5 stars ⭐"
              : "No information available"}
          </p>
          <p>
            <b>First published: </b>
            {result.docs[0]?.first_publish_year !== undefined &&
            result.docs[0]?.first_publish_year !== null
              ? result.docs[0]?.first_publish_year
              : "No information available"}
          </p>
          <p>
            <b>Length: </b>
            {result.docs[0]?.number_of_pages_median !== undefined &&
            result.docs[0]?.number_of_pages_median !== null
              ? result.docs[0]?.number_of_pages_median
              : "No information available"}
          </p>
        </div>
      </div>
    </>
  );
}
