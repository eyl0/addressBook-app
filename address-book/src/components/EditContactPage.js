// components/EditContactPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

function EditContactPage() {
  const [editedContact, setEditedContact] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const { id } = useParams();
  const [isAdded, setAdded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`/api/contacts/${id}`);
        if (response.ok) {
          const data = await response.json();
          setEditedContact(data.contact);
        } else {
          console.error('Failed to fetch contact');
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
      }
    };

    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedContact((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedContact),
      });
      if (response.ok) {
        setAdded(true);
      } else {
        alert('Failed to update contact!');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact!');
    }
  };

  return (
    <div className="page-container">
      {isAdded ? ( 
        <div className="form-container">
        <p>Contact Updated Successfully!</p>
        <Link to="/"><button className="cancel-button">Close</button></Link>
        </div>        
      ) : (
        <div className="form-container">
        <h2>Edit Contact</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={editedContact.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={editedContact.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Phone:</label>
            <input type="tel" name="phone" value={editedContact.phone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input type="text" name="address" value={editedContact.address} onChange={handleChange} />
          </div>
          <div className="button-container">
            <button className="submit-button" type="submit">Save</button>
            <Link to="/"><button className="cancel-button">Close</button></Link>
          </div>
        </form>
        </div>
      )}
    </div>
  );
}

export default EditContactPage;
