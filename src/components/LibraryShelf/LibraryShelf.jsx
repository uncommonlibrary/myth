export default function LibraryShelf({ books = [] }) {
  const COVER_URL = "https://covers.openlibrary.org/b/id/";

  if (books.length === 0) {
    return (
      <>
      <p>Add your current reads here!</p>
      </>
    )
  }
  return (
    <>
      {books.map((book, index) => (
        <div key={index}>
          <img src={`${COVER_URL}${book.fields.coverImage}.jpg`} />
          <h2>Title: {book.fields.title}</h2>
          <h3>Author: {book.fields.author}</h3>
        </div>
      ))}
    </>
  );
}
