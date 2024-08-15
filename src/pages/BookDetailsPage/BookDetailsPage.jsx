import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import {
  getDescription,
  getDataWithEdKey,
} from "../../services/bookDetailsService";
import { useLocation } from "react-router-dom";

export default function BookDetailsPage() {
  const [bookDetails, setBookDetails] = useState(null);
  const [result, setResult] = useState({ docs: [] });
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

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Book Details</h1>
      <h2>{result.docs[0]?.title}</h2>
      <h3>by {result.docs[0]?.author_name}</h3>
      <p>
        {bookDetails?.description?.value ??
          bookDetails?.description ??
          "No description available"}
      </p>
      <p>
        <b>Genre: </b>
        {result.docs[0]?.subject}
      </p>
      <p>
        <b>Average rating: </b>
        {result.docs[0]?.ratings_average} out of 5 stars
      </p>
      <p>
        <b>First published: </b>
        {result.docs[0]?.first_publish_year}
      </p>
      <p>
        <b>Length: </b>
        {result.docs[0]?.number_of_pages_median}
      </p>
    </>
  );
}
