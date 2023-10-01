import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../api/api";
import { Todo } from "../type";

interface TodosState {
    todos: Todo[];
    selectedTodoIds: number[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any;
    userIdFilter: number | null;
    todoFilter: string
}

const initialState: TodosState = {
    todos: [],
    selectedTodoIds: [],
    status: 'idle',
    error: null,
    userIdFilter: null,
    todoFilter: '',
}

export const fetchTodosAsync = createAsyncThunk('todos/fetchTodos', async () => {
    try {
        const response = await fetchTodos();
        return response?.data?.todos;
    } catch (error: AxiosError | any) {
        throw Error(error);
    }
});

export const updateTodoAsync = createAsyncThunk('todos/updateTodo', 
    async (params: { id: number; completed: boolean; }, { rejectWithValue }) => {
        try {
            const response = await updateTodo(params.id, { completed: params.completed })
            return { id: params.id, completed: params.completed };
        } catch (error: AxiosError | any) {
            return rejectWithValue(error.response.data);
        }
    });

export const deleteTodoAsync = createAsyncThunk('todos/deleteTodo',
    async (id: number, { rejectWithValue }) => {
        try {
            await deleteTodo(id);
            return id;
        } catch (error: AxiosError | any) {
            return rejectWithValue(error.response.data);
        }
    });

    export const addTodoAsync = createAsyncThunk('todos/addTodo', async (newTodo: Omit<Todo, 'id'>, { rejectWithValue }) => {
        try {
          const response = await addTodo(newTodo);
          if (response.data) return response.data;
          throw new Error('Unable to retrieve the data from the response');
        } catch (error: AxiosError | any) {
          return rejectWithValue(error.message);
        }
      });

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        setSelectedTodoIds: (state, action: PayloadAction<number[]>) => {
            state.selectedTodoIds = action.payload;
        },
        setUserIdFilter: (state, action: PayloadAction<number | null>) => {
            state.userIdFilter = action.payload;
        },
        setTodoFilter: (state, action: PayloadAction<string>) => {
            state.todoFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodosAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchTodosAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.todos = action.payload || [];
            })
            .addCase(fetchTodosAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateTodoAsync.fulfilled, (state, action) => {
                const todoIndex = state.todos.findIndex(todo => todo.id === action.payload.id);
                if (todoIndex !== -1) {
                    state.todos[todoIndex].completed = action.payload.completed;
                }
            })
            .addCase(deleteTodoAsync.fulfilled, (state, action) => {
                state.todos = state.todos.filter(todo => todo.id !== action.payload);
            })
            .addCase(addTodoAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.todos.unshift(action.payload);
              })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message;
            })
    },
});

export const { setSelectedTodoIds, setUserIdFilter, setTodoFilter } = todosSlice.actions;

export default todosSlice.reducer;