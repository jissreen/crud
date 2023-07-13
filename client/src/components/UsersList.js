import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser,createUser } from '../actions/userActions';
import { Link } from 'react-router-dom';


const UsersList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);

  useEffect(() => {
    


    dispatch(fetchUsers());}
  , [dispatch]);


  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };
  const handleCreateUser = () => {

     const newUser = {
    name: 'New User',
    email: 'newuser@example.com',
    phone: '1234567890',
  };
    dispatch(createUser(newUser));
  };
console.log('users:',users)
  return (
    <div>
      <h2>User List</h2>
      <Link to="/users/Create">Add User</Link>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
       
          {users.map((user) => (
           
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>
                <Link to={`/users/${user._id}`}>View</Link>
                <Link to={`/users/${user._id}/edit`}>Edit</Link>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
 ) )}
         
        </tbody>
      </table>
      
      
      
    </div>
  );
};

export default UsersList;
