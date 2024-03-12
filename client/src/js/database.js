import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log("PUT to the Database")

  const jate_DB = await openDB('jate', 1);
  const tx = jate_DB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;

  if (result) {
    console.log('Data saved to the database', result);
  } else {
    console.error('putDb not implemented');
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // Create a connection to the database database and version we want to use.
  const jate_DB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jate_DB.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .get(id) method to get all data in the database.
  const request = store.get(id);

  // Get confirmation of the request.
  const result = await request;

  if (result) {
    console.log('result.value', result.value);
    return result;
  } else {
    console.error('getDb not implemented');
  }
  
};

initdb();
