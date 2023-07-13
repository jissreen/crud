import axios from 'axios';
import { addUser } from '../redux/reducers/userReducer'; // Import the addUser action from your userSlice

const API_BASE_URL = 'http://localhost:3001/api';

// Action types
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

// Action creators
export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const createUserSuccess = (user) => {
  return {
    type: CREATE_USER_SUCCESS,
    payload: user,
  };
};

export const updateUserSuccess = (user) => {
  return {
    type: UPDATE_USER_SUCCESS,
    payload: user,
  };
};

export const deleteUserSuccess = (userId) => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: userId,
  };
};

// Async action creator to fetch users
export const fetchUsers = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users`); // Replace with your API endpoint
      const users=response.data;
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Response:',response.data)
      dispatch(fetchUserSuccess(users));
    } catch (error) {
      console.log('Error:',error)
      // Handle error if needed
    }
  };
};

// Async action creator to create a new user
export const createUser = (user) => {
    return async (dispatch) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/users`, user);
        dispatch(createUserSuccess(response.data));
        dispatch(addUser(response.data));
      } catch (error) {
        // Handle error if needed
      }
    };
  };
  

// Async action creator to update an existing user
export const updateUser = (id, user) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/users/${id}`, user); // Replace with your API endpoint
      dispatch(updateUserSuccess(response.data));
    } catch (error) {
      // Handle error if needed
    }
  };
};

// Async action creator to delete a user
export const deleteUser = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/users/${id}`); // Replace with your API endpoint
      dispatch(deleteUserSuccess(id));
    } catch (error) {
      // Handle error if needed
    }
  };
};
