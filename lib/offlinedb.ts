import { openDB } from "idb";

const DB_NAME = "app-cache";
const DB_VERSION = 1;

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains("messages")) {
      db.createObjectStore("messages", { keyPath: "id" });
    }
    if (!db.objectStoreNames.contains("media")) {
      db.createObjectStore("media", { keyPath: "url" });
    }
  },
});
