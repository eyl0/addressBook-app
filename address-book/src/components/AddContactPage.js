// components/AddContactPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddContactPage() {
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactDetails),
      });
      if (response.ok) {
        alert('Contact Added Successfully!');
        navigate('/');
      } else {
        alert('Failed to add contact!');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Failed to add contact!');
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2>Add Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={contactDetails.name} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={contactDetails.email} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="text" name="phone" value={contactDetails.phone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={contactDetails.address} onChange={handleInputChange} />
          </div>
          <div className="button-container">
            <button className="submit-button" type="submit">Submit</button>
            <Link to="/"><button className="cancel-button">Cancel</button></Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactPage;
