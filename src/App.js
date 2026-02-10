import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";

export default function App() {
  const [books, setBooks] = useState([]);

  // Load books from localStorage once on mount
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  // Save books to localStorage whenever books state changes
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home books={books} setBooks={setBooks} />}
        />
        <Route
          path="/book/:id"
          element={<BookDetails books={books} />}
        />
        <Route
          path="/add"
          element={<BookForm books={books} setBooks={setBooks} />}
        />
        <Route
          path="/edit/:id"
          element={<BookForm books={books} setBooks={setBooks} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
