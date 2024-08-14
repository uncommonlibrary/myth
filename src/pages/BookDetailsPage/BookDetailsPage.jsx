import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { getDescription } from "../../services/bookDetailsService";

export default function BookDetailsPage() {
    getDescription();
    return (
      <>
        <Navbar />
        <SearchBar />
        <h1>Book Details</h1>
      </>
    );
}