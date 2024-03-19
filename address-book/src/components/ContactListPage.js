// components/ContactListPage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DeleteContactModal from './DeleteContactModal';

function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState();
  const [selectedContactId, setSelectedContactId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contacts');
        if (response.ok) {
          const data = await response.json();
          console.log("This is my data" + data)
          setContacts(data.contacts);
        } else {
          console.error('Failed to fetch contacts');
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);
  
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted contact from the contacts array
        setContacts(contacts.filter(contact => contact.id !== id));
        alert('Contact Added Successfully!');
        console.log('Contact deleted successfully');
        setShowDeleteModal(false);
        navigate('/');
      } else {
        console.error('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleShowModal = (id) => {
    setSelectedContactId(id);
    setShowDeleteModal(true);
  };

  const onSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredContacts = Array.isArray(contacts) ? contacts.filter(contact =>
    Object.values(contact).some(field =>
      typeof field === 'string' && field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  ) : [];

  return (
    <div className="center-container">
      <div className="table-container">
        <h1>Address Book Web App</h1>
        <div className="header-button">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            className="search-field"
          />
          <Link to="/add"><button className="create-btn"> + Add Contact</button></Link>
        </div>
        {filteredContacts.length === 0 ? (
          <p>No contacts available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={contact.id}>
                  <td>{index + 1}.</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.address}</td>
                  <td>
                    <Link to={`/edit/${contact.id}`}><button className="edit-btn">Edit</button></Link>
                    <button className="delete-btn" onClick={() => handleShowModal(contact.id)}>Delete</button>
                    <Link to={`/view/${contact.id}`}><button className="view-btn">View</button></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeleteContactModal 
        showDeleteModal={showDeleteModal} 
        setShowDeleteModal={setShowDeleteModal} 
        handleDelete={handleDelete} 
        contactId={selectedContactId} 
        contact={contacts.find(contact => contact.id === selectedContactId)}
      />
    </div>
  );
}

export default ContactListPage;
