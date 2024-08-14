const BASE_URL = "https://openlibrary.org/works/";

//bookID here will become my key
export async function getDescription(bookId) {
  try {
    const response = await fetch(`${BASE_URL}${bookId}.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json; //i need json description from here
  } catch (error) {
    console.error(error.message);
    return "No description available";
  }
}
