const STORAGE_KEY = "my_library_books";

export function getLibrary() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveToLibrary(book) {
  const library = getLibrary();

  const exists = library.find((item) => item.id === book.id);
  if (exists) return;

  library.push(book);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}

export function removeFromLibrary(id) {
  const library = getLibrary().filter((book) => book.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(library));
}
