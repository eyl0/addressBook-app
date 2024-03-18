// ViewContactDetails.js
import React from 'react';

function ViewContactDetails({ contact, closeModal }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Contact Details</h2>
        <p>Name: {contact.name}</p>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Address: {contact.address}</p>
        <div className="button-container">
          <button className="cancel-button" onClick={closeModal}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default ViewContactDetails;
