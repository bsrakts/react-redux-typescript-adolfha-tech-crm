import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import loginReducer from '../features/loginSlice';
import todosReducer from '../features/todosSlice';
import productReducer from '../features/productSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    user: userReducer,
    todos: todosReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
