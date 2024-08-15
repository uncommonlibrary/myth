const WORKS_URL = "https://openlibrary.org/works/";
const SEARCH_URL = "https://openlibrary.org/search.json?q=";

//bookID here will become my key
export async function getDescription(bookId) {
  try {
    const response = await fetch(`${WORKS_URL}${bookId}.json`);
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

export async function getDataWithEdKey(editionKey) {
  try {
    const response = await fetch(`${SEARCH_URL}${editionKey}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json; //need all the other deets: title author published ratings etc
  } catch (error) {
    console.error(error.message);
    return "Data not available";
  }
}