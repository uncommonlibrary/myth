import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { getData } from "../../services/searchService.js";
import { useLocation } from "react-router-dom";

export default function SearchPage() {
  const [result, setResult] = useState({});
  const location = useLocation();

  const loadResult = async () => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q");
    if (query) {
      const data = await getData(query);
      setResult(data);
    }
  };

  useEffect(() => {
    loadResult();
  }, [location.search]);

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Search Results</h1>
      <h2>Book: {result.numFound}</h2>
    </>
  );
}
