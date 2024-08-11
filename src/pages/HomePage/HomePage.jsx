import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";

const url = "https://api.airtable.com/v0/app39xSNujiUrbaTR/Table%201";
const urlKey =
  "patEpEsxTz3CTwZIw.bc945ee535bb3b899ca5312e1fc695491b658d07e020efe888aff4a1ba4f518c";

export default function HomePage() {
  const [name, setName] = useState("reader");

  useEffect(() => {
    const displayName = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${urlKey}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        const records = json.records;
        setName(records[0].fields.Name);
      } catch (error) {
        console.error(error.message);
      }
    };
    displayName();
  }, []);

  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Welcome, {name}!</h1>
      <h3>What are you reading today?</h3>
      <h2>Your Library</h2>
      <p>books here</p>
      <h2>TBR Shelf</h2>
      <p>books here</p>
    </>
  );
}
