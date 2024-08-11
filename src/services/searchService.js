const BASE_URL = "https://openlibrary.org/search.json?q=";

export async function getData(query) {
  try {
    const queryString = `${query.replace(/ /g, "+")}`;
    const response = await fetch(BASE_URL + queryString);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
    return "No book found";
  }
}
