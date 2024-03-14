import React from 'react';
import { Link } from 'react-router-dom';

function ContactListPage({ contacts, onEdit, onView, onDelete }) {
  return (
    <div>
      {contacts.length === 0 ? (
        <p>No contacts available</p>
      ) : (
      contacts.map((contact, index) => (
        <li  key={contact.id}>
          <tr>
              <td>{index + 1}.</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>
                <button onClick={() => onView(contact)}>View</button>
                {/* <button onClick={() => onEdit(contact.id)}>Edit</button> */}
                <Link to={`/edit/${contact.id}`}><button>Edit</button></Link>
                <button onClick={() => onDelete(contact)}>Delete</button>
              </td>
          </tr>
        </li>
      )))}
    </div>
  );
}

export default ContactListPage;
