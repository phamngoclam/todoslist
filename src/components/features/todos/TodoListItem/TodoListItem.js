import React from "react";
import { availableColors, capitalize } from "../../filters/colors";
import "./TodoListItem.scss";
import {useDispatch, useSelector} from "react-redux";
import { ReactComponent as TimeSolid } from "./times-circle-solid.svg";

import { todoToggled, colorSlected, selectTodos } from "../todosSlice";
/*
*  const todoAppState = {
      todos: [
        { id: 0, text: 'Learn React', completed: true },
        { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
        { id: 2, text: 'Build something fun!', completed: false, color: 'blue' }
      ],
      filters: {
        status: 'Active',
        colors: ['red', 'blue']
      }
    }
* */
const selectTodoById = (state, todoId) => {
    return selectTodos(state).find((todo) => todo.id === todoId)
};

const TodoListItem = ({ id, onColorChange, onCompletedChange, onDelete }) => {
    const todo = useSelector(state => selectTodoById(state, id));
    const { text, completed, color } = todo;
    const dispatch = useDispatch();
    const handleCompletedChanged = (e) => {
        dispatch(todoToggled(todo.id))
    };
    
    const handleColorChanged = (e) => {
        const color = e.target.value;
        dispatch(colorSlected(todo.id, color));
    };
    
    
    const colorOptions = availableColors.map((c) => (
        <option key={c} value={c} >
            {capitalize(c)}
        </option>
    ))

    return (
        <li className="list-item">
            <div className="view">
                <div className="segment label">
                    <label className="todo-text">{text}
                        <input
                            className="toggle"
                            type="checkbox"
                            checked={completed}
                            onChange={handleCompletedChanged}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <div className="segment buttons">
                    <select
                        className="colorPicker"
                        value={color}
                        style={{ color }}
                        onChange={handleColorChanged}
                    >
                        <option value=""></option>
                        {colorOptions}
                    </select>
                    <button className="destroy" onClick={onDelete}>
                        <TimeSolid />
                    </button>
                </div>
            </div>
        </li>
    )
    
};

export default TodoListItem;
