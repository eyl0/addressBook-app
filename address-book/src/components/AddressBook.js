import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DeleteModal from "./DeleteModal";

function AddressBook() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const addContact = (event) => {
    event.preventDefault();
    if (name && email && phone && address) {
      const newContact = { id: uuidv4(), name, email, phone, address };
      const isExistingContact = contacts.some(contact => contact.name === name);
      if (isExistingContact) {
        alert('A contact with the same name already exists.');
        resetForm();
        return;
      }    
      const newContacts = [...contacts, newContact];
      setContacts(newContacts);
      localStorage.setItem('contacts', JSON.stringify(newContacts));
      resetForm();
      alert('Added Successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  };
  
  const editContact = (idToEdit) => {
    const contactToEdit = contacts.find(contact => contact.id === idToEdit);
    if (contactToEdit) {
      setName(contactToEdit.name);
      setEmail(contactToEdit.email);
      setPhone(contactToEdit.phone);
      setAddress(contactToEdit.address);
      setIsEditMode(true);
      setSelectedContact(contactToEdit);

      console.log("Selected Contact (during edit):", selectedContact);
    } 
  };
  
  const updateContact = (event) => {
    event.preventDefault();
    if (name && email && phone && address) {
      const newContact = { id: selectedContact.id, name, email, phone, address };
      const updatedContacts = contacts.map(contact => {
        if (contact.id === selectedContact.id) {
          return { ...newContact };
        } return contact;
      });
      setContacts(updatedContacts);
      setIsEditMode(false);
      localStorage.setItem('contacts', JSON.stringify(updatedContacts));
      resetForm();
      alert('Update Successful!'); 
    } else {
      alert('Please fill in all fields.');
    }
  };  

  const deleteContact = (idToDelete) => {
    console.log('Deleting contact with ID:', idToDelete);
    const updatedContacts = contacts.filter(contact => contact.id !== idToDelete);
    setContacts(updatedContacts);
    localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    console.log('Deleting contact information:', selectedContact);
    setSelectedContact(null);
    setDeleteModalOpen(false);
    alert('Contact deleted successfully!');
  };

  const handleToggleDeleteContactForm = (idToDelete) => {
    console.log('Toggling delete modal with id:', idToDelete);
    const contactToDelete = contacts.find(contact => contact.id === idToDelete);
    console.log('Selected Contact:', contactToDelete);
    setSelectedContact(contactToDelete);
    setDeleteModalOpen(true);
  };

  const viewContact = (id) => {
    const contact = contacts.find(contact => contact.id === id);
    setSelectedContact(contact);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
    setIsEditMode(false);
    setSelectedContact(null);
  };

  const formTitle = isEditMode ? 'Update Contact' : 'Add Contact';
  console.log("Selected Contact:", selectedContact);
  return (
    <div>
      <DeleteModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => {
              setDeleteModalOpen(false);
              setSelectedContact(null); 
          }} 
          onDelete={deleteContact} 
          idToDelete={selectedContact ? selectedContact.id : null}
          contactName={selectedContact ? selectedContact.name : ""}
      />

      <h1>Address Book</h1>
      <form onSubmit={isEditMode ? updateContact : addContact}>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Name" 
          required 
          pattern="[A-Za-z\s]+" // Only allows alphabetic characters and spaces
          title="Enter alphabetic characters only."
        />

        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Validates email format
          title="Please enter a valid email address (e.g., example@example.com)"
        />

        <input 
          type="tel" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          placeholder="Phone" 
          required 
          pattern="[0-9]{11}" // Allows exactly 11 digits
          title="Enter a 11-digit phone number."
        />

        <input 
          type="text" 
          value={address} 
          onChange={(e) => setAddress(e.target.value)} 
          placeholder="Address" 
          required 
        />

        <button type="submit">{formTitle}</button>
        {isEditMode && <button type="button" onClick={resetForm}>Cancel</button>}
      </form>
      <div className="contact-list">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map ((contact, index) => (
              <tr key={contact.id}>
                <td>{index + 1}.</td>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>{contact.address}</td>
                <td>
                  <button onClick={() => editContact(contact.id)}>Edit</button>
                  <button onClick={() => handleToggleDeleteContactForm(contact.id)}>Delete</button>
                  <button onClick={() => viewContact(contact.id)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isEditMode && !isDeleteModalOpen && selectedContact && (
        <div className="contact-details">
          <h2>Contact Details</h2>
          <p><strong>Name:</strong> {selectedContact.name}</p>
          <p><strong>Email:</strong> {selectedContact.email}</p>
          <p><strong>Phone:</strong> {selectedContact.phone}</p>
          <p><strong>Address:</strong> {selectedContact.address}</p>
          <button onClick={() => setSelectedContact(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default AddressBook;