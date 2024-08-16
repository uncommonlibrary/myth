import "./ArchiveShelf.css";

export default function ArchiveShelf({books = []}) {
  const COVER_URL = "https://covers.openlibrary.org/b/id/";

    if (books.length === 0) {
      return (
        <>
          <p>Revisit past reads here!</p>
        </>
      );
    }

 return (
   <div id="archiveshelfcontainer">
     {books.slice(0,3).map((book, index) => (
       <div key={index}>
         <img src={`${COVER_URL}${book.fields.coverImage}.jpg`} />
         <h2>{book.fields.title}</h2>
         <h3>by {book.fields.author}</h3>
       </div>
     ))}
   </div>
 );
}
