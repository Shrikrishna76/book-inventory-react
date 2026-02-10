import React from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetails({ books }) {
  const { id } = useParams();

  // IMPORTANT: id from useParams is a string, and your book.id is also a string
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div>
        <h2>Book not found</h2>
        <Link to="/">Back</Link>
      </div>
    );
  }

  return (
    <div>
      <p><strong>Title:</strong> {book.title}</p>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Email:</strong> {book.email}</p>
      <p><strong>Overview:</strong> {book.overview}</p>

      <Link to="/">Back</Link>
    </div>
  );
}
