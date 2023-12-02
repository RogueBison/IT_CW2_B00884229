import React, { useState } from "react";
import { useNavigate } from "react-router";
export default function Create() {
 const [form, setForm] = useState({
    title: "",
    authors: "",
    genres: "",
    rating: "",
    description: "",
    year: "",
 });
 const navigate = useNavigate();
  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
    // When a post request is sent to the create url, we'll add a new document to the database.
   const newBook = { ...form };
    await fetch("http://localhost:5000/document/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newBook),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
    setForm({ title: "", authors: "", genres: "", rating: "", description: "", year: "" });
   navigate("/");
 }
  // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Add a New Book</h3>
     <form onSubmit={onSubmit}>
       <div>
         <label htmlFor="title">Title</label>
         <input
           type="text"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="authors">Authors</label>
         <input
           type="text"
           id="authors"
           value={form.authors}
           onChange={(e) => updateForm({ authors: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="genres">Genres</label>
         <input
           type="text"
           id="genres"
           value={form.genres}
           onChange={(e) => updateForm({ genres: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="rating">Rating</label>
         <input
           type="text"
           id="rating"
           value={form.rating}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="description">Description</label>
         <input
           type="text"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="year">Year</label>
         <input
           type="text"
           id="year"
           value={form.year}
           onChange={(e) => updateForm({ year: e.target.value })}
         />
       </div>
       <div>
         <input
           type="submit"
           value="CREATE"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}