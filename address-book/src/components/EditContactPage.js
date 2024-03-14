// EditContact.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

function EditContactPage({ onUpdate }) {
  const { id } = useParams();
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    // Fetch contact details by id and set the state
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const selectedContact = storedContacts.find((contact) => contact.id === id);
    if (selectedContact) {
      setContact(selectedContact);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(contact);
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={contact.name} onChange={handleChange} placeholder="Name" required />
        <input type="email" name="email" value={contact.email} onChange={handleChange} placeholder="Email" required />
        <input type="tel" name="phone" value={contact.phone} onChange={handleChange} placeholder="Phone" required />
        <input type="text" name="address" value={contact.address} onChange={handleChange} placeholder="Address" required />
        <button type="submit">Save</button>
        <Link to="/"><button>Cancel</button></Link>
      </form>
    </div>
  );
}

export default EditContactPage;
