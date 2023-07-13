import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UsersList from './components/UsersList';
import CreateUser from './components/CreateUser';
import ViewUser from './components/ViewUser';
import UserForm from './components/UserForm';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route  path="/users" element={<UsersList />}/>
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="/users/:id" element={<ViewUser />} />
          
        </Routes>
      </div>
    </Router>
  );
};


export default App;
