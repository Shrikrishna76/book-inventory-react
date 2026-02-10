// components/BookForm.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BookForm({ books, setBooks }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    author: "",
    email: "",
    overview: "",
  });

  useEffect(() => {
    if (isEdit) {
      const book = books.find((b) => b.id === id);
      if (book) setForm(book);
    }
  }, [id, isEdit, books]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      setBooks(books.map((b) => (b.id === id ? form : b)));
    } else {
      setBooks([...books, { ...form, id: Date.now().toString() }]);
    }
    navigate("/");
  };

  return (
    <div>
      <h2>{isEdit ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <textarea
          placeholder="Overview"
          value={form.overview}
          onChange={(e) => setForm({ ...form, overview: e.target.value })}
        />
        <button type="submit">{isEdit ? "Update" : "Save"}</button>
      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  );
}
