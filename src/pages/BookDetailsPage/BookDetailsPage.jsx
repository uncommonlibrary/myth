import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getDescription } from "../../services/bookDetailsService";
import { useLocation } from "react-router-dom";

export default function BookDetailsPage() {
  const [bookDetails, setBookDetails] = useState(null);
  const location = useLocation();
  const editionKey = location.state?.editionKey;
  console.log("EditionKey:", editionKey);

  const currentUrl = window.location.href; //https://stackoverflow.com/questions/4178578/how-to-get-url-from-browser-address-bar
  const decodeUrl = decodeURIComponent(currentUrl); //must decode url to get the book ID: https://www.geeksforgeeks.org/how-to-encode-and-decode-a-url-in-javascript/
  const bookId = decodeUrl.split("/").pop(); //splits string into array of substring and pops the last element which contains ID i need
  console.log("Book ID:", bookId);

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
      <h2>Title</h2>
      <h3>Author</h3>
      <p>
        {bookDetails?.description?.value ??
          bookDetails?.description ??
          "No description available"}
      </p>
    </>
  );
}
