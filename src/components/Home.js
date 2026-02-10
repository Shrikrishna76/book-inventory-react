// components/Home.js
import React from "react";
import { Link } from "react-router-dom";

export default function Home({ books, setBooks }) {
  const deleteBook = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  return (
    <div>
      <h1>Book Inventory</h1>
      <Link to="/add">Add Book</Link>
      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="3">No books available</td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <Link to={`/book/${book.id}`}>View</Link> |{" "}
                  <Link to={`/edit/${book.id}`}>Edit</Link> |{" "}
                  <button onClick={() => deleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
