import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteContactModal from './DeleteContactModal';

function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const onSearch = (query) => { 
    console.log(query);
    setSearchQuery(query); // updates the searchQuery state with the new query value.
  };

  // Filtering existing contacts array based on search query
  // The filter method iterates through each contact in the array.
  // If it does, the contact is included in the filteredContacts array

  const filteredContacts = contacts.filter(contact =>
    Object.values(contact).some(field =>
      typeof field === 'string' && field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDelete = () => {
    const updatedContacts = contacts.filter(contact => contact.id !== selectedContactId);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
    alert('Successfully deleted!');
    setShowDeleteModal(false);
  };

  const handleShowModal = (id) => {
    setSelectedContactId(id);
    setShowDeleteModal(true);
  };

  return (
    <div className="center-container">
      <div className="table-container">
        <h1>Address Book Web App</h1>
        <div className="header-button">
          {/* <h2>Contact List</h2> */}
          <div className="form-group">
          <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)} // Update search query state
              className="search-field"
            />
          </div>
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
                  <div className= 'group-button'>
                    <Link to={`/edit/${contact.id}`}>
                      <button className="edit-btn">Edit</button>
                    </Link>
                    <button className="delete-btn" onClick={() => handleShowModal(contact.id)}>Delete</button>
                    <Link to={`/view/${contact.id}`}>
                      <button className="view-btn" >View</button>
                    </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeleteContactModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} contactId={selectedContactId}  contact={contacts.find(contact => contact.id === selectedContactId)}/>
    </div>
  );
}

export default ContactListPage;
