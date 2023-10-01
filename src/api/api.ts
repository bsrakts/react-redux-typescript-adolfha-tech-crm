
import axios from 'axios';
import { Todo } from '../type';

const baseURL = 'https://dummyjson.com';

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

export const addTodo = (newTodo: { userId: number, todo: string, completed: boolean }) => {
  return api.post(`/todos/add`, JSON.stringify(newTodo))
}