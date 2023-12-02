import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DocumentCard = (props) => (
  <div className="col-md-4 mb-3 d-flex justify-content-center">
    <div className="card w-75">
      <div className="d-flex justify-content-center align-items-center">
      <img 
        src={`${process.env.PUBLIC_URL}/images/${props.document.path}`} 
        alt="book cover" 
        style={{width:'143px',height:'197px'}} 
        className="card-img-top" 
      />
      </div>
      <div className="card-body">
        <h4 className="card-title">{props.document.title}</h4>
        <h5>Authors: </h5>
        <p className="card-text">{props.document.authors}</p>
        <h5>Genres: </h5>
        <p className="card-text">{props.document.genres}</p>
        <h5>Rating: </h5>
        <p className="card-text">{props.document.rating}</p>
        <h5>Year Released: </h5>
        <p className="card-text">{props.document.year}</p>
        <Link to={`/single/${props.document._id}`} className="btn btn-primary">
          View Full Book Details
        </Link>
      </div>
    </div>
  </div>
);

export default function Home() {
  const [documents, setDocuments] = useState([]);

  // Fetch the book documents from the database.
  useEffect(() => {
    async function getDocuments() {
      try {
        const response = await fetch(`http://localhost:5000/document/`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const documents = await response.json();
        setDocuments(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    }

    getDocuments();
  }, []);

  // Map out the book documents as cards
  function documentList() {
    return documents.map((document) => (
      <DocumentCard key={document._id} document={document} />
    ));
  }

  // Display the cards
  return (
    <div>
      <h3>All Books</h3>
      <div className="row">
        {documentList()}
      </div>
    </div>
  );
}