import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useState, useEffect } from "react";

export default function ArchivePage() {
  return (
    <>
      <Navbar />
      <SearchBar />
      <h1>Your Archive</h1>
    </>
  );
}
