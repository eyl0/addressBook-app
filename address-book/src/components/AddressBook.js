import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ContactList from './ContactListPage';
import AddContactPage from './AddContactPage';
import EditContactPage from './EditContactPage';
import ViewContactModal from './ViewContactModal';
import DeleteContactModal from './DeleteContactModal';

function AddressBook() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const addContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    navigate('/');
  };

  const editContact = (id) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    setSelectedContact(contactToEdit);
    navigate(`/edit/${id}`);
  };

  const updateContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    navigate('/');
  };

  const deleteContact = () => {
    const updatedContacts = contacts.filter((contact) => contact.id !== selectedContact.id);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setSelectedContact(null);
    setDeleteModalOpen(false);
    navigate('/');
  };

  const viewContact = (contact) => {
    setSelectedContact(contact); 
    setEditModalOpen(true); 
  };

  return (
    <div>
      <h1>Address Book</h1>
      <Link to="/add"><button>Add Contact</button></Link>
      <ContactList contacts={contacts} onEdit={editContact} onView={viewContact} onDelete={setDeleteModalOpen} />
      <ViewContactModal isOpen={isEditModalOpen} onClose={() => setEditModalOpen(false)} contact={selectedContact} />
      <DeleteContactModal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} onDelete={deleteContact} contact={selectedContact} />
      
      <Routes>
        <Route path="/add" element={<AddContactPage onAdd={addContact} />} />
        <Route path="/edit/:id" element={<EditContactPage onUpdate={updateContact} />} />
        <Route path="/view/:id" element={<ViewContactModal contact={selectedContact} />} />
      </Routes>
    </div>
  );
}

export default AddressBook;
