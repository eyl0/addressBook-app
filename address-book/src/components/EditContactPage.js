import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function EditContactPage({ onSave, onClose }) {
  const [editedContact, setEditedContact] = useState({}); // Initialize editedContact as an empty object
  const { id } = useParams();

  useEffect(() => {
    // Fetch contact details by id and set the state
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = storedContacts.find((editedContact) => editedContact.id === id);
    if (selectedContact) {
      setEditedContact(editedContact);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact(prevState => ({ ...prevState, [name]: value })); // Update editedContact state with the changed input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting edited contact:', editedContact);
    onSave(editedContact); // Pass the updated contact data to the onSave function
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        {/* <span className="close" onClick={onClose}>&times;</span> */}
        <h2>Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={editedContact.name || ''} onChange={handleChange} placeholder="Name" />
          <input type="email" name="email" value={editedContact.email || ''} onChange={handleChange} placeholder="Email" />
          <input type="tel" name="phone" value={editedContact.phone || ''} onChange={handleChange} placeholder="Phone" />
          <input type="text" name="address" value={editedContact.address || ''} onChange={handleChange} placeholder="Address" />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default EditContactPage;
