// DeleteContactModal.js
import React from 'react';

function DeleteContactModal({ isOpen, onClosed, onDelete, contact }) {
  if (!isOpen || !contact) return null;

  const handleDelete = () => {
    onDelete(contact.id);
    onClosed();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
        <h2>Delete Contact</h2>
        <p>Are you sure you want to delete {contact.name}?</p>
        <div style={{ textAlign: 'center' }}>
          <button style={{ marginRight: '10px' }} onClick={handleDelete}>Delete</button>
          <button onClick={onClosed}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteContactModal;
