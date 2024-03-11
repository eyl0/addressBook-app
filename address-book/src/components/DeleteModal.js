import React from 'react';

const DeleteModal = ({ isOpen, onClose, onDelete, idToDelete, contactName}) => {
  console.log('DeleteModal isOpen:', isOpen);
  return (
    <div className="modal-container">
      {isOpen && (
        <div className="modal">
          <div className="modal-header">Delete Confirmation</div>
          <div className="modal-body">
            <p>{`Are you sure you want to delete "${contactName}" from contacts?`}</p>
          </div>
          <div className="modal-footer">
            <button className="button" onClick={() => onDelete(idToDelete)}>Yes</button>
            <button className="button" onClick={onClose}>No</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteModal;
