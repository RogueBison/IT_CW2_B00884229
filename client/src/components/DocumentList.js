import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const Document = (props) => (
 <tr>
   <td>{props.document.name}</td>
   <td>{props.document.email}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.document._id}`}>Edit</Link>
     <button className="btn btn-link"
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
     <h3>All Documents</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Name</th>
           <th>Email</th>
           <th></th>
         </tr>
       </thead>
       <tbody>{documentList()}</tbody>
     </table>
   </div>
 );
}