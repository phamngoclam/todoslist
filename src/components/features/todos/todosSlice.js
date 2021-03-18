import { client } from '../../../api/client';
import { createSelector } from 'reselect';
import { StatusFilters } from "../filters/filtersSlice";

const initialState = {
    status: 'idle', // or: 'loading', 'succeeded', 'failed'
    entities: []
};

export default function todosReducer(state = initialState, action) {
    switch (action.type) {
        case 'todos/todoAdded': {
            return {
                ...state,
                entities: [...state.entities, action.payload]
            }
        }
        case 'todos/todoToggled': {
            return {
                ...state,
                entities: state.entities.map(todo => {
                    if (todo.id !== action.payload) {
                        return todo;
                    }
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                })
            }
        }
        case 'todos/colorSelected': {
            const { todoId, color } = action.payload;
            return {
                ...state,
                entities: state.entities.map((todo) => {
                    if (todo.id !== todoId) {
                        return todo
                    }
                    return {
                        ...todo,
                        color,
                    }
                })
            }
        }
        case 'todos/todosLoading': {
            return {
                ...state,
                status: 'loading'
            }
        }
        case 'todos/todosLoaded': {
            return {
                ...state,
                status: 'idle',
                entities: action.payload
            }
        }
        case 'todos/allCompleted': {
            return {
                ...state,
                entities: state.entities.map((todo) => {
                    return {
                        ...todo,
                        completed: true
                    }
                })
            }
        }
        case 'todos/completedCleared': {
            return {
                ...state,
                entities: state.entities.filter(todo => !todo.completed)
            }
        }
        default:
            return state;
    }
}

export const todosLoaing = () => ({ type: 'todos/todosLoading'});
export const todosLoaded = todos => ({ type: 'todos/todosLoaded', payload: todos });
export const todoAdded = todo => ({ type: 'todos/todoAdded', payload: todo });
export const todoToggled = todoId => ({ type: 'todos/todoToggled', payload: todoId });
export const colorSlected = (todoId, color) => ({ type: 'todos/colorSelected', payload: { todoId, color } });
export const allCompleted = () => ({ type: 'todos/allCompleted' });
export const completedCleared = () => ({ type: 'todos/completedCleared' });

//Thunk functions
export const fetchTodos = () => async dispatch => {
    dispatch(todosLoaing());
    const responseData = await client.get('/fakeApi/todos');
    console.log(responseData.todos);
    dispatch(todosLoaded(responseData.todos));
}

export function saveNewTodo(text) {
    return async function saveNewTodoThunk(dispatch) {
        const initialTodo = { text };
        const response = await client.post('/fakeApi/todos', { todo: initialTodo });
        dispatch(todoAdded(response.todo))
    }
}

export const selectTodos = state => state.todos.entities;

export const selectFilteredTodos = createSelector(
    selectTodos,
    state => state.filters,
    (todos, filters) => {
        const { status, colors } = filters;
        const showAllCompletions = status === StatusFilters.All;
        if(showAllCompletions && colors.length === 0) {
            return todos;
        }
        const completedStatus = status === StatusFilters.Completed;
        return todos.filter(todo => {
            const statusMatches = showAllCompletions || todo.completed === completedStatus;
            const colorsMatches = colors.length === 0 || colors.includes(todo.color)
            return statusMatches && colorsMatches;
        });
    }
);

export const selectFilteredTodoIds = createSelector(
    selectFilteredTodos,
    filteredTodos => filteredTodos.map(todo => todo.id)
);
