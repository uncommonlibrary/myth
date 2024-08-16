import { Route, Routes } from "react-router-dom";
import "./tufte.css";
/* PAGES */
import MainPage from "./pages/MainPage/MainPage";
import HomePage from "./pages/HomePage/HomePage";
import SearchPage from "./pages/SearchPage/SearchPage";
import BookDetailsPage from "./pages/BookDetailsPage/BookDetailsPage";
import TBRPage from "./pages/TBRPage/TBRPage";
import LibraryPage from "./pages/LibraryPage/LibraryPage";
import ArchivePage from "./pages/ArchivePage/ArchivePage";
import LoginPage from "./pages/LoginPage/LoginPage";

export default function App() {
  // const [book, setBook] = useState({});

  // const loadBook = async () => {
  //   const data = await getData();
  //   setBook(data);
  // };

  // useEffect(() => {
  //   loadBook();
  // }, []);

  //INSERT COMPONENTS BELOW
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/book/:key" element={<BookDetailsPage />} />
        <Route path="/shelves/tbr" element={<TBRPage />} />
        <Route path="/shelves/library" element={<LibraryPage />} />
        <Route path="/shelves/archive" element={<ArchivePage />} />
        {/*MISSING JOURNAL PAGE - to be added later if possible */}
      </Routes>
      {/* <h1>Author: {JSON.stringify(result.docs)}</h1> */}
      {/* <h2>Number: {book.numFound}</h2> */}
    </>
  );
}
