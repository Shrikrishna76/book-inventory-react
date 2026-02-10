// import React, { useEffect, useState } from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./components/Home";
// import BookDetails from "./components/BookDetails";
// import BookForm from "./components/BookForm";

// export default function App() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/books")
//       .then((res) => res.json())
//       .then((data) => setBooks(data))
//       .catch((err) => console.error("API error:", err));
//   }, []);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home books={books} setBooks={setBooks} />} />
//         <Route path="/book/:id" element={<BookDetails books={books} />} />
//         <Route path="/add" element={<BookForm />} />
//         <Route path="/edit/:id" element={<BookForm />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import BookDetails from "./components/BookDetails";
import BookForm from "./components/BookForm";

export default function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/books")
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.error("API error:", err));
  }, []);

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
