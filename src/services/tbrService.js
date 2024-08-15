//this URL for TBR shelf airtable
const url = "https://api.airtable.com/v0/app80K0OB0akZ36aN/Table%201";
const urlKey = `${import.meta.env.VITE_APIKEY}`;

//fetches all books from shelves airtable
export async function fetchAllBooks() {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${urlKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    const records = json.records;
    return records;
  } catch (error) {
    console.error(error.message);
  }
}

//this is to add books to TBR shelf. this function is used in Search Results page.
export async function addToTBR(book) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${urlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              editionKey: book.edition_key[0],
              title: book.title,
              author: book.author_name?.[0],
              coverImage: book.cover_i,
              location: "tbr",
            },
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

//this is to delete books from TBR shelf. This is used in TBR page to remove books.
export async function deleteFromTBR(recordID) {
  try {
    const response = await fetch(`${url}/${recordID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${urlKey}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

//shift book to library
export async function moveToLibrary(recordID) {
  try {
    const response = await fetch(`${url}/${recordID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${urlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          location: "library",
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

//add book to library from search result page
export async function addToLibrary(book) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${urlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              editionKey: book.edition_key[0],
              title: book.title,
              author: book.author_name?.[0],
              coverImage: book.cover_i,
              location: "library",
            },
          },
        ],
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
  } catch (error) {
    console.error(error.message);
  }
}

//when books are marked as read, they are moved to archive. this appears in library page.
export async function moveToArchive(recordID) {
  try {
    const response = await fetch(`${url}/${recordID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${urlKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: {
          location: "archive",
        },
      }),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    await response.json();
  } catch (error) {
    console.error(error.message);
  }
}

//update location
//airtable filter location to display books in library
//have each result show more details in another page
