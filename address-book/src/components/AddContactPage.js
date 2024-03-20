// components/AddContactPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AddContactPage() {
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [isAdded, setAdded] = useState(false);

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
        setAdded(true);
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
      {isAdded ? (
        <div className="form-container">
        <p>Contact added successfully!</p>
        <Link to="/"><button className="cancel-button">Close</button></Link>
        </div>
      ) : (
      <div className="form-container">
      <div>
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
            <Link to="/"><button className="cancel-button">Close</button></Link>
          </div>
        </form>
      </div>
      </div>
      )}
    </div>
  );
}

export default AddContactPage;
