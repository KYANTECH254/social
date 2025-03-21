import { dbPromise } from "@/lib/offlinedb";

export async function saveMessage(message: any) {
  const db = await dbPromise;
  await db.put("messages", message);
}

export async function getAllMessages() {
  const db = await dbPromise;
  return await db.getAll("messages");
}

export async function clearMessages() {
  const db = await dbPromise;
  await db.clear("messages");
}

export async function cacheMedia(url: string) {
  const db = await dbPromise;
  const response = await fetch(url);
  const blob = await response.blob();
  await db.put("media", { url, blob });
}

export async function getCachedMedia(url: string): Promise<Blob | null> {
  const db = await dbPromise;
  const entry = await db.get("media", url);
  return entry ? entry.blob : null;
}

export async function clearMedia() {
  const db = await dbPromise;
  await db.clear("media");
}

export async function clearAllCache() {
  const dbs = await indexedDB.databases();
  await Promise.all(dbs.map(db => db.name && indexedDB.deleteDatabase(db.name)));
  window.location.reload();
}
