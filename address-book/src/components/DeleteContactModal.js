// DeleteContactModal.js
import React from 'react';

function DeleteContactModal({ isOpen, onClose, onDelete, contact }) {
  if (!isOpen || !contact) {
    return null;
  }

  return (
    <div>
      <div>Are you sure you want to delete {contact.name} from contacts?</div>
      <button onClick={onDelete}>Yes</button>
      <button onClick={onClose}>No</button>
    </div>
  );
}

export default DeleteContactModal;
