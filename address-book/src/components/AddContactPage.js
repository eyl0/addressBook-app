import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function AddContactPage({ onAdd }) {
  const [contact, setContact] = useState({ name: '', email: '', phone: '', address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contact.name || !contact.email || !contact.phone || !contact.address) {
      alert('Please fill in all fields.');
      return;
    }
    const newContact = { ...contact, id: uuidv4() };
    console.log(onAdd);
    onAdd(newContact);
    navigate('/');
  };

  return (
    <div>
      <h2>Add Contact</h2>
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

export default AddContactPage;
