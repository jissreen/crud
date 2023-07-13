import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';


const initialState = [];

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      return action.payload;
    },
    addUser: (state, action) => {
      console.log('Action payload:', action.payload);
      state.push(action.payload);
      
      
    },
    updateUser: (state, action) => {
      
      const { _id, name, email, phone } = action.payload;
      const userIndex = state.findIndex(user => user._id === _id);
      if (userIndex !== -1) {
        state[userIndex].name = name;
        state[userIndex].email = email;
        state[userIndex].phone = phone;
      }   
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      
      return state.filter(user => user.id !== userId);
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;