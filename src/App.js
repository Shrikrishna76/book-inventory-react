// App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";

export default function App() {
  const [books, setBooks] = useState([]);

  // Load initial books from localStorage or default data
  useEffect(() => {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      // Default sample books
      const defaultBooks = [
        { id: "7696", title: "The Guide", author: "R. K. Narayan", email: "rknarayan@gmail.com", overview: "A classic Indian novel..." },
        { id: "bbf7", title: "Midnight's Children", author: "Salman Rushdie", email: "salman.rushdie@gmail.com", overview: "A powerful story..." },
        { id: "1c41", title: "The God of Small Things", author: "Arundhati Roy", email: "arundhati.roy@gmail.com", overview: "A deeply emotional novel..." },
      ];
      setBooks(defaultBooks);
      localStorage.setItem("books", JSON.stringify(defaultBooks));
    }
  }, []);

  // Update localStorage whenever books change
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
        <Route path="/book/:id" element={<BookDetails books={books} />} />
        <Route path="/add" element={<BookForm books={books} setBooks={setBooks} />} />
        <Route path="/edit/:id" element={<BookForm books={books} setBooks={setBooks} />} />
      </Routes>
    </BrowserRouter>
  );
}
