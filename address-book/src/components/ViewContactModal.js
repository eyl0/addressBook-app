// ViewContactModal.js
import React from 'react';

function ViewContactModal({ contact, onClose }) {
  if (!contact) return null;

  return (
    <div className="modal-backdrop">
      <div className='contact-details'>
        <h2>View Contact</h2>
        <p>Name: {contact.name}</p>
        <p>Email: {contact.email}</p>
        <p>Phone: {contact.phone}</p>
        <p>Address: {contact.address}</p>
        <button className= 'close-btn' onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ViewContactModal;
