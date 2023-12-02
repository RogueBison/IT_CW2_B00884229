import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DocumentCard = ({ document }) => (
  <div className="col-md-4 mb-3 d-flex justify-content-center">
    <div className="card w-75">
      <div className="d-flex justify-content-center align-items-center">
      <img
        src={`${process.env.PUBLIC_URL}/images/${document.path}`}
        alt="book cover"
        style={{width:'143px',height:'197px'}} 
        className="card-img-top"
      />
      </div>
      <div className="card-body">
        <h4 className="card-title">{document.title}</h4>
        <h5>Authors: </h5>
        <p className="card-text">{document.authors}</p>
        <h5>Genres: </h5>
        <p className="card-text">{document.genres}</p>
        <h5>Rating: </h5>
        <p className="card-text">{document.rating}</p>
        <h5>Description: </h5>
        <p className="card-text">{document.description}</p>
        <h5>Year Released: </h5>
        <p className="card-text">{document.year}</p>
      </div>
    </div>
  </div>
);

export default function Single() {
  const [document, setDocument] = useState({});
  const params = useParams();

  useEffect(() => {
    async function fetchDocument() {
      try {
        const response = await fetch(`http://localhost:5000/document/${params.id}`);

        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }

        const documentData = await response.json();
        if (!documentData) {
          window.alert(`Document with id ${params.id} not found`);
          return;
        }

        setDocument(documentData);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    }

    fetchDocument();
  }, [params.id]);

  return (
    <div>
      <h3>Book Details for "{document.title}"</h3>
      <div className="row">
        {<DocumentCard document={document} />}
      </div>
    </div>
  );
}

