import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Document = (props) => (
 <tr>
   <td><Link to={`/single/${props.document._id}`}>{props.document.title}</Link></td>
   <td>{props.document.authors}</td>
   <td>{props.document.genres}</td>
   <td>{props.document.rating}</td>
   <td>{props.document.description}</td>
   <td>{props.document.year}</td>
   <td>
    <img src={`${process.env.PUBLIC_URL}/images/${props.document.path}`} alt="book cover" width="143" height="197"/>
  </td>
   <td>
     <Link to={`/edit/${props.document._id}`}>Edit</Link>
     <br />
     <button
       onClick={() => {
         props.deleteDocument(props.document._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
);
export default function DocumentList() {
 const [documents, setDocuments] = useState([]);

  // This method fetches the film documents from the database.
 useEffect(() => {
   async function getDocuments() {
     const response = await fetch(`http://localhost:5000/document/`);

      if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }

      const documents = await response.json();
     setDocuments(documents);
   }

    getDocuments();

    return;
 }, [documents.length]);

  // This method will delete a film document
 async function deleteDocument(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });

    const newDocuments = documents.filter((el) => el._id !== id);
   setDocuments(newDocuments);
 }

  // This method will map out the film documents on the table
 function documentList() {
   return documents.map((document) => {
     return (
       <Document
         document={document}
         deleteDocument={() => deleteDocument(document._id)}
         key={document._id}
       />
     );
   });
 }
  // This following section will display the table with the records of individuals.
 return (
   <div>
     <table>
       <thead>
         <tr>
           <th>Title</th>
           <th>Authors</th>
           <th>Genres</th>
           <th>Rating</th>
           <th>Description</th>
           <th>Year Released</th>
           <th>Cover</th>
           <th></th>
         </tr>
       </thead>
       <tbody>{documentList()}</tbody>
     </table>
   </div>
 );
}