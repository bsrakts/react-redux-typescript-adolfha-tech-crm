import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import loginReducer from '../features/loginSlice';
import todosReducer from '../features/todosSlice';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
