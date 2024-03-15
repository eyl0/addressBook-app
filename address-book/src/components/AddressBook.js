import React, { useState, useEffect } from 'react';
import AddContactPage from './AddContactPage';
import ContactListPage from './ContactListPage';
import EditContactPage from './EditContactPage';
import DeleteContactModal from './DeleteContactModal';
import ViewContactModal from './ViewContactModal';

function AddressBook() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleAddContact = (newContact) => {
    const updatedContacts = [...contacts, newContact];
    // setContacts(updatedContacts);
    setContacts((prevContacts) => [...prevContacts, newContact]);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
  };

  const handleEditContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setSelectedContact(null);
    setEditModalOpen(false);
  };

  const handleDeleteContact = (idToDelete) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== idToDelete);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <div className="center-container">
        <h1>Address Book</h1>
      </div>
      <AddContactPage onAddContact={handleAddContact} />
      <EditContactPage onSave={handleEditContact} />
      <ContactListPage
        contacts={contacts}
        onViewDetails={(contact) => {
          setSelectedContact(contact);
          setDeleteModalOpen(false); 
        }}
        onDelete={(contactId) => {
          setSelectedContact(contacts.find(contact => contact.id === contactId));
          setDeleteModalOpen(true);
        }}
        onEdit={setEditModalOpen}
      />
        {/* {selectedContact && isEditModalOpen && (
          <EditContactPage 
            contact={selectedContact} 
            onSave={handleEditContact} 
            onClose={() => setEditModalOpen(false)} 
          />
        )} */}
      <DeleteContactModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeleteContact}
        contact={selectedContact}
        onClosed={() => setSelectedContact(null)}
      />
        {selectedContact && contacts.find(contact => contact.id === selectedContact.id) && (
          <ViewContactModal contact={selectedContact} onClose={() => setSelectedContact(null)} />
        )}
    </div>
  );
}

export default AddressBook;
