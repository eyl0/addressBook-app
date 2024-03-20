// components/ViewContactDetails.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ViewContactDetails({ isDeleted = false, handleDelete}) { 
  const { id } = useParams();
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`/api/contacts/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("This is view details" + data);
          setContact(data.contact);
        } else {
          console.error('Failed to fetch contact');
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, [id]);

  console.log('This is view details', contact);

  return (
    <div className="center-container">
      <div className="table-container">
        <h2>Contact Details</h2>
        {contact ? (
          <div>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Phone:</strong> {contact.phone}</p>
            <p><strong>Address:</strong> {contact.address}</p>
          </div>
        ) : (
          <p>Contact not found</p>
        )}
        <div className="button-container">
          {isDeleted && <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>}
          <Link to="/"><button className="cancel-button">Close</button></Link>
        </div>
      </div>
    </div>
  );
}

export default ViewContactDetails;
