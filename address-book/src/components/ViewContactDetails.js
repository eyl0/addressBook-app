// ViewContactDetails.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function ViewContactDetails() {
  const { id } = useParams(); 
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = storedContacts.find(contact => contact.id === parseInt(id));
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [id]);

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
        <div className= 'button-container'>
          <Link to="/" className="cancel-link">
            <button className="cancel-button">Close</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewContactDetails;