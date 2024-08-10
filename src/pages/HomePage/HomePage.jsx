import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Welcome, user!</h1>
      <h3>What are you reading today?</h3>
      <h2>Your Library</h2>
      <p>books here</p>
      <h2>TBR Shelf</h2>
      <p>books here</p>
    </>
  );
}
