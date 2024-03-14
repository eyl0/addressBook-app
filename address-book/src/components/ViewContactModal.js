import React from 'react';

function ViewContactModal({ isOpen, onClose, contact }) {
  if (!isOpen || !contact) {
    return null;
  }
  return (
    <div>
      <h2>Contact Details</h2>
      {contact ? (
        <div>
          <p><strong>Name:</strong> {contact.name}</p>
          <p><strong>Email:</strong> {contact.email}</p>
          <p><strong>Phone:</strong> {contact.phone}</p>
          <p><strong>Address:</strong> {contact.address}</p>
        </div>
      ) : (
        <p>Contact not found.</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
}

export default ViewContactModal;
