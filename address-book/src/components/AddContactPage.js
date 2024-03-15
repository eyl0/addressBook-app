import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AddContactPage({ onAddContact }) {
  const [contactDetails, setContactDetails] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting form...');
    console.log('Adding new contact'+ contactDetails);
    onAddContact({ id: uuidv4(), ...contactDetails });
    console.log('Calling onAddContact with:', { id: uuidv4(), ...contactDetails });
    console.log(typeof onAddContact);
    // setContactDetails({
    //   name: '',
    //   email: '',
    //   phone: '',
    //   address: '',
    // });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Contact</h2>
      <input type="text" name="name" value={contactDetails.name} onChange={handleInputChange} placeholder="Name" required/>
      <input type="email" name="email" value={contactDetails.email} onChange={handleInputChange} placeholder="Email" required/>
      <input type="text" name="phone" value={contactDetails.phone} onChange={handleInputChange} placeholder="Phone" required/>
      <input type="text" name="address" value={contactDetails.address} onChange={handleInputChange} placeholder="Address" required/>
      <button type="submit">submit</button>
    </form>
  );
}

export default AddContactPage;
