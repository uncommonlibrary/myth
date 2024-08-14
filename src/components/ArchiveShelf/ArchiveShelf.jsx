export default function ArchiveShelf({books = []}) {
 return (
   <>
     {books.map((book, index) => (
       <div key={index}>
         <h2>Title: {book.fields.title}</h2>
         <h3>Author: {book.fields.author}</h3>
       </div>
     ))}
   </>
 );
}
