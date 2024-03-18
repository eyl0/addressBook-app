import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddContactPage from './components/AddContactPage';
import EditContactPage from './components/EditContactPage';
import ContactListPage from './components/ContactListPage';
import ViewContactDetails from './components/ViewContactDetails';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" exact element={<ContactListPage/>} />
        <Route path="/add" element={<AddContactPage />} />
        <Route path="/edit/:id" element={<EditContactPage/>} />
        <Route path="/view/:id" element={<ViewContactDetails/>} />
      </Routes>
    </Router>
  </React.StrictMode>
);
