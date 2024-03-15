// ContactListPage.js
import React from 'react';
import { Link } from 'react-router-dom';

function ContactListPage({ contacts, onViewDetails, onDelete, onSave }) {
  // const handleDelete = (idToDelete) => {
  //   onDelete(idToDelete);
  // };
  
  return (
    <div className="center-container">
      <div className="table-container">
      <h2>Contact List</h2>
      <Link to="/add">
        <button className='create-btn'>Create</button>
      </Link>
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
        {Array.isArray(contacts) && contacts.map((contact, index) =>  (
            <tr key={contact.id}>
              <td>{index + 1}.</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>
                <button className= 'view-btn' onClick={() => onViewDetails(contact)}>View</button>
                <Link to={`/edit/${contact.id}`}>
                <button className= 'edit-btn'>Edit</button>
                </Link>
                <button className= 'delete-btn' onClick={() => onDelete(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       )}
    </div>
    </div>
  );
}

export default ContactListPage;
