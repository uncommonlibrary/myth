import "./TBRShelf.css";

export default function TBRShelf({ books = [] }) {
  const COVER_URL = "https://covers.openlibrary.org/b/id/";

  if (books.length === 0) {
    return (
      <>
        <p>Start your reading journey by adding some to-reads!</p>
      </>
    );
  }

  return (
    <div id="tbrshelfcontainer">
      {books.slice(0, 3).map((book, index) => (
        <div key={index}>
          <img src={`${COVER_URL}${book.fields.coverImage}.jpg`} />
          <h2>{book.fields.title}</h2>
          <h3>by {book.fields.author}</h3>
        </div>
      ))}
    </div>
  );
}
