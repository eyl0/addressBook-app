// components/ContactListPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ContactListPage() {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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
                    <Link to={`/delete/${contact.id}`}><button className="delete-btn">Delete</button></Link>
                    <Link to={`/view/${contact.id}`}><button className="view-btn">View</button></Link>
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
