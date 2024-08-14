import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useEffect, useState } from "react";

const url = "https://api.airtable.com/v0/app39xSNujiUrbaTR/Table%201";
const urlKey = `${import.meta.env.VITE_APIKEY}`;

export default function HomePage() {
  const [name, setName] = useState("reader");

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
