// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// export default function BookForm() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const isEdit = Boolean(id);

//   const [form, setForm] = useState({
//     title: "",
//     author: "",
//     email: "",
//     age: "",
//     overview: "",
//   });

//   useEffect(() => {
//     if (isEdit) {
//       fetch(`http://localhost:5000/books/${id}`)
//         .then((res) => res.json())
//         .then((data) => setForm(data));
//     }
//   }, [id, isEdit]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch(
//       isEdit
//         ? `http://localhost:5000/books/${id}`
//         : "http://localhost:5000/books",
//       {
//         method: isEdit ? "PUT" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       }
//     ).then(() => navigate("/"));
//   };

//   return (
//     <div>
//       <h2>{isEdit ? "Edit Book" : "Add Book"}</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           placeholder="Title"
//           value={form.title}
//           onChange={(e) => setForm({ ...form, title: e.target.value })}
//         />

//         <input
//           placeholder="Author"
//           value={form.author}
//           onChange={(e) => setForm({ ...form, author: e.target.value })}
//         />

//         <input
//           placeholder="Email"
//           value={form.email}
//           onChange={(e) => setForm({ ...form, email: e.target.value })}
//         />

//         <input
//           placeholder="Age"
//           value={form.age}
//           onChange={(e) => setForm({ ...form, age: e.target.value })}
//         />

//         <textarea
//           placeholder="Overview"
//           value={form.overview}
//           onChange={(e) => setForm({ ...form, overview: e.target.value })}
//         />

//         <button type="submit">
//           {isEdit ? "Update" : "Save"}
//         </button>
//       </form>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
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
      const existingBook = books.find((b) => b.id === id);
      if (existingBook) {
        setForm(existingBook);
      }
    }
  }, [id, isEdit, books]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isEdit
      ? `http://localhost:5000/books/${id}`
      : "http://localhost:5000/books";

    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const savedBook = await res.json();

    if (isEdit) {
      // update book instantly
      setBooks(books.map((b) => (b.id === id ? savedBook : b)));
    } else {
      // add book instantly
      setBooks([...books, savedBook]);
    }

    navigate("/");
  };

  return (
  <div>
    <h2>{isEdit ? "Edit Book" : "Add Book"}</h2>

    {isEdit && (
      <button
        type="button"
        onClick={() => navigate("/")}
        style={{
          marginBottom: "15px",
          backgroundColor: "#555"
        }}
      >
        ← Back
      </button>
    )}

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
        onChange={(e) =>
          setForm({ ...form, overview: e.target.value })
        }
      />

      <button type="submit">
        {isEdit ? "Update" : "Save"}
      </button>
    </form>
  </div>
);
}