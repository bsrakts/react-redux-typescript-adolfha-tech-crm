import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { generateToken } from "../helper/generateToken";

interface LoginState {
  isAuthenticated: boolean;
  isLogOut: boolean,
  error: string | null;
}

const initialState: LoginState = {
  isAuthenticated: false,
  isLogOut: true,
  error: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string, password: string }>) => {
      const { username, password } = action.payload;
      if (username === 'admin' && password === 'admin') {
        const token = generateToken();
        console.log(token, "Random Token Is Here =>>>>>")
        localStorage.setItem("accessToken", token)
        state.isAuthenticated = true;
        state.isLogOut = false;
        console.log(state.isAuthenticated, "Random Token Is Here =>>>>>")
        state.error = null;
      } else {
        state.error = 'Oopss! An error was encountered while log in.';
      }
    },
    logout: (state, action: PayloadAction<{isLogOut: Boolean}>) => {
      const {isLogOut} = action.payload;
      if(isLogOut) {
        localStorage.removeItem("accessToken")
        state.isLogOut = true;
        state.isAuthenticated = false;
        state.error = null;
      } else {
        state.error = 'Oopss! An error was encountered while log out.'
      }
    }
  },
});

export const { login,logout } = loginSlice.actions;
export default loginSlice.reducer;
