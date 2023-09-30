
import axios from 'axios';

const baseURL = 'https://dummyjson.com';

interface Todo {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
}

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export const fetchUsers = () => api.get('/users');
export const fetchTodos = () => api.get('/todos');

export const updateTodo = (id: number, data: { completed: boolean }) => {
  return api.put(`/todos/${id}`, JSON.stringify(data));
};

export const deleteTodo = (id: number) => {
  return api.delete(`/todos/${id}`)
}

export const addTodo = (newTodo: Omit<Todo, 'id'>) => {
  return api.post(`/todos`, newTodo);
};