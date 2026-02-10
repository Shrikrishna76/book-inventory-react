import React, { useState, useEffect } from "react";

const BookForm = () => {
  // State to hold form inputs
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  // Load books from localStorage when component mounts
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Save books to localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const onSubmit = (e) => {
    e.preventDefault();

    // Prevent empty submissions
    if (!title.trim() || !author.trim()) return;

    const newBook = {
      id: Date.now(),
      title,
      author,
    };

    setBooks([...books, newBook]); // Add new book to state

    // Clear form
    setTitle("");
    setAuthor("");
  };

  const removeBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Book Inventory</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Book</button>
      </form>

      <h3>Books List</h3>
      {books.length === 0 ? (
        <p>No books added yet.</p>
      ) : (
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              "{book.title}" by {book.author}{" "}
              <button onClick={() => removeBook(book.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookForm;
