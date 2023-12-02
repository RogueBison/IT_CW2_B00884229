import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

 export default function Edit() {
  
 const [form, setForm] = useState({
  title: "",
  authors: "",
  genres: "",
  rating: "",
  description: "",
  year: "",
 });

 const params = useParams();
 const navigate = useNavigate();

  useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/document/${params.id.toString()}`);

      if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

      const document = await response.json();
     if (!document) {
       window.alert(`Document with id ${id} not found`);
       navigate("/");
       return;
     }

      setForm(document);
   }

    fetchData();

    return;
 }, [params.id, navigate]);

  // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
  async function onSubmit(e) {
   e.preventDefault();
   const editedBook = {
     title: form.title,
     authors: form.authors,
     genres: form.genres,
     rating: form.rating,
     description: form.description,
     year: form.year,
   };
    // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedBook),
     headers: {
       'Content-Type': 'application/json'
     },
   });
    navigate("/");
 }
  // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Edit Book</h3>
     <form onSubmit={onSubmit}>
       <div>
         <label htmlFor="title">Title: </label>
         <input
           type="text"
           id="title"
           value={form.title}
           onChange={(e) => updateForm({ title: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="authors">authors: </label>
         <input
           type="text"
           id="authors"
           value={form.authors}
           onChange={(e) => updateForm({ authors: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="genres">Genres: </label>
         <input
           type="text"
           id="genres"
           value={form.genres}
           onChange={(e) => updateForm({ genres: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="rating">Rating: </label>
         <input
           type="text"
           id="rating"
           value={form.rating}
           onChange={(e) => updateForm({ rating: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="description">Description: </label>
         <textarea
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div>
         <label htmlFor="year">Year: </label>
         <input
           type="text"
           id="year"
           value={form.year}
           onChange={(e) => updateForm({ year: e.target.value })}
         />
       </div>
       <br />
 
       <div>
         <input
           type="submit"
           value="UPDATE"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}