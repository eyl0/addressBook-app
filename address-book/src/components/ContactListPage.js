import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteContactModal from './DeleteContactModal';
import ViewContactDetails from './ViewContactDetails'; 

function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

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
  const handleShowViewModal = (contact) => {
    setSelectedContactId(contact);
    setShowViewModal(true);
  };

  return (
    <div className="center-container">
      <div className="table-container">
        <h1>Address Book Web App</h1>
        <div className="header-button">
          <h2>Contact List</h2>
          <Link to="/add"><button className="create-btn"> + Add Contact</button></Link>
        </div>
        {contacts.length === 0 ? (
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
              {contacts.map((contact, index) => (
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
                    {/* <Link to={`/view/${contact.id}`}> */}
                      <button className="view-btn" onClick={() => handleShowViewModal(contact) }>View</button>
                    {/* </Link> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <DeleteContactModal showDeleteModal={showDeleteModal} setShowDeleteModal={setShowDeleteModal} handleDelete={handleDelete} contactId={selectedContactId}  contact={contacts.find(contact => contact.id === selectedContactId)}/>
      {showViewModal && (
        <ViewContactDetails
          contact={selectedContactId}
          closeModal={() => setShowViewModal(false)}
        />
      )}
    </div>
  );
}

export default ContactListPage;
