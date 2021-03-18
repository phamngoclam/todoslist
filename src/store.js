import {applyMiddleware, createStore} from "redux";
import rootReducer from "./reducer";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

// let preloadedState;
// const persistedTodosString = localStorage.getItem('todos');
// if (persistedTodosString) {
//     preloadedState = {
//         todos: JSON.parse(persistedTodosString)
//     }
// }

// const delayActionMiddleware = storeAPI => next => action => {
//     if (action.type === 'todos/todoAdded') {
//         setTimeout(() => {
//             next(action)
//         }, 1000)
//         return
//     }
//     return next(action)
// }

const store = createStore(rootReducer, composedEnhancer);

export default store;
