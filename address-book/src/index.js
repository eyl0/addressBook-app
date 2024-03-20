import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddContactPage from './components/AddContactPage';
import EditContactPage from './components/EditContactPage';
import ContactListPage from './components/ContactListPage';
import ViewContactDetails from './components/ViewContactDetails';
import DeleteContactModal from './components/DeleteContactModal';
import { makeServer } from './server';
import './index.css';


// Initialize Mirage server
if (process.env.NODE_ENV === 'development') {
  makeServer({ environment: 'development' });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<ContactListPage />} />
        <Route path="/add" element={<AddContactPage />} />
        <Route path="/edit/:id" element={<EditContactPage />} />
        <Route path="/view/:id" element={<ViewContactDetails />} />
        <Route path="/delete/:id" element={<DeleteContactModal />} />
      </Routes>
    </Router>
  </React.StrictMode>
);