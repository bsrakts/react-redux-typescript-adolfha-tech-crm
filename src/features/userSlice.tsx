import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../api/api";
import { AxiosError } from "axios";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    email: string;
    phone: string;
    birthDate: string;
    image: string;
  }
  
  interface UsersState {
    users: User[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: AxiosError | any;
  }
  
  const initialState: UsersState = {
    users: [],
    status: 'idle',
    error: null
  };

export const fetchUserAsync = createAsyncThunk('users/fetchUsers', async() => {
    const response = await fetchUsers();
    console.log(response, "what is response? =>>>")
    return response?.data?.users;
})

const usersSlice = createSlice({
name: 'users',
initialState,
reducers: {},
extraReducers: (builder) => {
    builder
    .addCase(fetchUserAsync.pending, (state) => {
        state.status = 'loading'
    })
    .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
    })
    .addCase(fetchUserAsync.rejected, (state,action) => {
        state.status = 'failed';
        state.error = action.error.message
    })
}
})

export default usersSlice.reducer;
