import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddressBook from './components/AddressBook';
import AddContactPage from './components/AddContactPage';
import EditContactPage from './components/EditContactPage';
import ContactListPage from './components/ContactListPage';
import DeleteContactModal from './components/DeleteContactModal';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <Router>
      <Routes>
        <Route path="/" element={<AddressBook />} />
        {/* <Route path="/add" element={<AddContactPage></AddContactPage>}></Route> */}
        <Route path="/add" element={<AddContactPage />} />
        <Route path="/edit/:id" element={<EditContactPage></EditContactPage>}></Route>
        <Route path="/delete/:id" element={<DeleteContactModal></DeleteContactModal>}></Route>
        <Route path="/list" element={<ContactListPage></ContactListPage>}></Route>
      </Routes>
    </Router>
    </React.StrictMode>,
  );

