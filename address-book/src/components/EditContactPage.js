import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function EditContactPage() {
  const [editedContact, setEditedContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = storedContacts.find((contact) => contact.id === parseInt(id));
    if (selectedContact) {
      setEditedContact(selectedContact);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact(prevState => ({ ...prevState, [name]: value })); // Update editedContact state with the changed input value
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting edited contact:', editedContact);
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const updatedContacts = storedContacts.map(contact => {
      if (contact.id ===  parseInt(id)) {
         return { ...contact, ...editedContact }; 
       }
       return contact;
    });
    console.log('Submitting updated contact:', updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    alert('Contact updated successfully!');
    navigate("/");
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Edit Contact</h2>
          <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={editedContact.name || ''} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={editedContact.email || ''} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={editedContact.phone || ''} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={editedContact.address || ''} onChange={handleChange}/>
          </div>
          <div className= 'button-container'>
            <button className="submit-button"type="submit">Save</button>
            <Link to="/"><button className="cancel-button" >Cancel</button></Link>
          </div>
          </form>
      </div>
    </div>
  );
}

export default EditContactPage;
