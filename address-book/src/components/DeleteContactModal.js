import React from 'react';

function DeleteContactModal({ showDeleteModal, setShowDeleteModal, handleDelete, contact }) {
  const handleClose = () => {
    setShowDeleteModal(false);
  };

  return (
    showDeleteModal && (
      <div className='modal-overlay'>
      <div className='modal-content'>
          <h2>Delete Contact</h2>
          {contact && contact.id && (
            <p>Are you sure you want to delete this contact '{contact.name}'?</p>
          )}
          <div className= 'button-container'>
            <button className="submit-button" onClick={handleDelete}>Yes</button>
            <button className="cancel-button" onClick={handleClose}>No</button>
          </div>
        </div>
      </div>
    )
  );
}

export default DeleteContactModal;
