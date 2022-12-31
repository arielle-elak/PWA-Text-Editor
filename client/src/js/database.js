// Using openDB for making changes and calls
import { openDB } from "idb";

// Database is called 'jate' using version 1
const initdb = async () =>
  openDB("jate", 1, {
    // If db schema has not been already added, add it!
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Logic for a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the database");
  // Wait for async to create the database and specity the version 1
  const jateDb = await openDB("jate", 1);
  // Specify readwrite permissions to the jate db (PUT)
  const tx = jateDb.transaction("jate", "readwrite");
  // Open the jate objectStore as specified above
  const store = tx.objectStore("jate");
  // PUT method will place content at the given (which wil always be 1 since it's a text editor and is being overridden)
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request
  const result = await request;
  console.log("🚀 - data saved to the database", result.value);
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET from the database");

  // Create a connection to the database database and version we want to use.
  const jateDb = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges (read only for GET)
  const tx = jateDb.transaction("jate", "readonly");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log("result.value", result);
  return result;
};

// Start up the database
initdb();
