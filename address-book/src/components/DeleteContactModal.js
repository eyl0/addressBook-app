import React from "react";
import ViewContactDetails from "./ViewContactDetails";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function DeleteContactModal() {
  const { id } = useParams();
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {

      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setIsDeleted(true);
      } else {
        console.error('Error deleting contact');
      }
    } catch (error) {
      console.error('Error deleting contact', error);
    }
  };

  return (
    <div className="page-container">
      {isDeleted ? (
        <div className="form-container">
        <p>Contact deleted successfully!</p>
        <Link to="/"><button className="cancel-button">Close</button></Link>
        </div>
      ) : (
        <>
          <ViewContactDetails  isDeleted={true}/> 
        </>
      )}
    </div>
  );
}

export default DeleteContactModal;