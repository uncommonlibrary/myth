const BASE_URL = "https://openlibrary.org";
const key = "/works/OL16509148W";

export async function getDescription() {
  try {
    const response = await fetch(`${BASE_URL}${key}.json`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // return json;
    console.log(json.description);
  } catch (error) {
    console.error(error.message);
    return "No book found";
  }
}
