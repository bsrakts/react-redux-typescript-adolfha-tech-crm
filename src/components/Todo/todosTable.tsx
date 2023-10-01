import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, IconButton, Modal, Switch, TextField } from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { addTodoAsync, deleteTodoAsync, fetchTodosAsync, setTodoFilter, setUserIdFilter, updateTodoAsync } from '../../features/todosSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../../type';
import { generateUserId } from '../../helper/generateUserId';
import PageTitle from '../pageTitle';

const TodosTable: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const todos = useSelector((state: RootState) => {
        console.log(state.todos.todos);
        return state.todos.todos;
    });
    const userIdFilter = useSelector((state: RootState) => state.todos.userIdFilter);
    const todoFilter = useSelector((state: RootState) => state.todos.todoFilter);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>(todos);
    const [isOpen, setIsOpen] = useState(false);
    const [newTodo, setNewTodo] = useState('');
    const [addCompleted, setAddCompleted] = useState(false)

    useEffect(() => {
        dispatch(fetchTodosAsync());
    }, [dispatch]);

    useEffect(() => {
        setFilteredTodos(todos);
    }, [todos]);

    const handleToggleTodo = (id: number, completed: boolean) => {
        dispatch(updateTodoAsync({ id, completed: !completed }));
        setAddCompleted(true)
    };

    const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodoAsync(id));
    };

    const handleAddTodo = () => {
        if (newTodo.trim()) {
            dispatch(addTodoAsync({ todo: newTodo, completed: addCompleted, userId: generateUserId() }));
            setNewTodo('');
        }
    };

    useEffect(() => {
        let results = [...todos];
        if (userIdFilter !== null) {
            const userIdFilterStr = userIdFilter.toString(); // number'ı string'e çevir.
            results = results.filter(todo => todo.userId.toString().includes(userIdFilterStr));
        }
        if (todoFilter.trim() !== '') {
            const lowerCaseFilter = todoFilter.toLowerCase();
            results = results.filter(todo => todo.todo.toLowerCase().includes(lowerCaseFilter));
        }
        setFilteredTodos(results);
    }, [todos, userIdFilter, todoFilter]);

    return (
        <>
            <div className="my-4 flex items-center justify-between">
                <div>
                    <TextField label="Filter by User ID" variant="outlined" onChange={(e) => dispatch(setUserIdFilter(Number(e.target.value) || null))} className='!mr-8' />
                    <TextField label="Filter by Todo" variant="outlined" onChange={(e) => dispatch(setTodoFilter(e.target.value))} />
                </div>
                <Button variant="contained" color="inherit" onClick={() => setIsOpen(true)}>Add Todo</Button>
            </div>
            <div className="mt-5 max-h-[50vh] overflow-y-auto">
                {[...filteredTodos]
                    .sort((a, b) => a.userId - b.userId)
                    .map(todo => (
                        <div key={todo.id} className="p-4 border rounded-md shadow-md mb-4 flex flex-row justify-between items-center">
                            <div className='flex'>
                                <div className="border border-stone-400 rounded-full w-8 h-8 flex justify-center items-center mr-4 shadow-lg shadow-stone-300">{todo.userId}</div>
                                <p className="h-8 flex items-center">{todo.todo}</p>
                            </div>
                            <div>
                                <Switch
                                    checked={todo.completed}
                                    onChange={() => handleToggleTodo(todo.id, todo.completed)}
                                    color="success"
                                />
                                <IconButton onClick={() => handleDeleteTodo(todo.id)}>
                                    <DeleteIcon className='hover:text-red-600 hover:transition-colors ease-in-out hover:duration-500' />
                                </IconButton>
                            </div>
                        </div>
                    ))}
            </div>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} className='flex justify-center'>
                <div className="p-4 m-auto w-1/3 bg-white rounded-md shadow-md">
                    <PageTitle text='Add New To Do' />
                    <TextField fullWidth label="New Todo" variant="outlined" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                    <div className={`flex justify-end items-center`}>
                        Completed: <Switch
                            onChange={() => setAddCompleted && setAddCompleted(true)}
                            color={'success'}
                        />
                    </div>
                    <Button className="!mt-8" fullWidth variant="contained" color="primary" onClick={handleAddTodo}>Add</Button>
                </div>
            </Modal>
        </>
    );
};

export default TodosTable;
