import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams} from 'react-router-dom';
import { createUser, updateUser, fetchUsers } from '../actions/userActions';
import { addUser } from '../redux/reducers/userReducer';

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const isEditing = !!id;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const user = { name, email, phone };

    if (isEditing) {
      dispatch(updateUser(id, user));
    } else {
      dispatch(createUser(user));
    }

    navigate('/');
  };
  const handleCreateUser = () => {
    const newUser = {
      name: 'New User',
      email: 'newuser@example.com',
      phone: '1234567890',
    };
    dispatch(addUser(newUser));
  };

  useEffect(() => {
    if (isEditing) {
      dispatch(fetchUsers(id))
        .then((response) => {
          const { name, email, phone } = response.payload;
          setName(name);
          setEmail(email);
          setPhone(phone);
        })
        .catch((error) => {
          // Handle error if needed
        });
    }
  }, [isEditing, id, dispatch]);
  
    
  return (
    <div>
      <h2>{isEditing ? 'Update User' : 'Create User'}</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <button  type="submit">{isEditing ? 'Update' : 'Create'}</button>
      </form>
    
    </div>
  );
};

export default CreateUser;
