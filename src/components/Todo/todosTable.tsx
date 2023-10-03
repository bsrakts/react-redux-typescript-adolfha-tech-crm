import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, IconButton, Modal, Switch, TextField } from '@mui/material';
import { AppDispatch, RootState } from '../../store/store';
import { addTodoAsync, deleteTodoAsync, fetchTodosAsync, setTodoFilter, setUserIdFilter, updateTodoAsync } from '../../features/todosSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import { Todo } from '../../type';
import { generateUserId } from '../../helper/generateUserId';
import PageTitle from '../pageTitle';
import { AddCircle, HdrPlus, PlusOneSharp } from '@mui/icons-material';
import { Player } from '@lottiefiles/react-lottie-player';
import LabelMessage from '../LabelMessage/labelMessage';

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
    const [isAdded, setIsAdded] = useState(false)

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
        setIsAdded(true)
    };

    useEffect(() => {
        let results = [...todos];
        if (userIdFilter !== null) {
            const userIdFilterStr = userIdFilter.toString();
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
            <div className="my-4 flex flex-col md:flex-row items-center justify-between">
                <div className='flex md:flex-row mb-4'>
                    <TextField label="Filter by User ID" variant="outlined" onChange={(e) => dispatch(setUserIdFilter(Number(e.target.value) || null))} className='md:!mr-8 !m-4' />
                    <TextField label="Filter by Todo" variant="outlined" onChange={(e) => dispatch(setTodoFilter(e.target.value))} className='!m-4' />
                </div>
                <Button variant="contained" className='!bg-emerald-800' onClick={() => setIsOpen(true)}><AddCircle /></Button>
            </div>
            <div className="mt-5 max-h-[50vh] overflow-y-auto">
                {[...filteredTodos]
                    .sort((a, b) => a.userId - b.userId)
                    .map(todo => (
                        <div key={todo.id} className="p-4 border rounded-md shadow-md mb-4 flex flex-row justify-between items-center">
                            <div className='flex'>
                                <div className="border border-stone-400 rounded-full w-8 h-8 flex justify-center items-center mr-4 shadow-lg shadow-stone-300">{todo.userId}</div>
                                <p className="h-8 flex items-center w-48 md:w-full">{todo.todo}</p>
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
                <div className="p-4 m-auto w-2/3 md:w-1/3 bg-white rounded-md shadow-md">
                    <PageTitle text='Add New To Do' />
                    {!isAdded && (
                        <>
                            <TextField fullWidth label="New Todo" variant="outlined" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                            <div className={`flex justify-end items-center`}>
                                Completed: <Switch
                                    onChange={() => setAddCompleted && setAddCompleted(true)}
                                    color={'success'}
                                />
                            </div>
                        </>
                    )}
                    {isAdded && (
                        <>
                            <div className='flex flex-col justify-center items-center'>
                                <Player
                                    autoplay
                                    loop
                                    src="https://lottie.host/7f8a6d18-beba-41c6-9ff2-1e7cfddba190/qW0Zeqd9nX.json"
                                    style={{ height: '300px', width: '300px' }}
                                />
                                <LabelMessage text='Adding todo was successful. Want to add another to do?' />
                            </div>
                        </>
                    )

                    }
                    <Button className={`!mt-8 ${isAdded ? '!bg-gray-500' : '!bg-emerald-600'}`} fullWidth variant="contained" onClick={handleAddTodo}>{isAdded ? 'ADDED' : 'ADD'}</Button>
                </div>
            </Modal>
        </>
    );
};

export default TodosTable;
