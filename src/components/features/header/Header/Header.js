import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Header.scss";

import { saveNewTodo } from "../../todos/todosSlice";

const Header = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    
    const handleChange = (e) => setText(e.target.value);
    
    const handleKeyDown = e => {
        const trimmedText = e.target.value.trim();
        
        //If user press Enter key
        if (e.which === 13 && trimmedText) {
            const saveNewTodoThunk = saveNewTodo(trimmedText);
            dispatch(saveNewTodoThunk);
            setText('');
        }
    };
    
    return (
        <header className="header">
            <h2>Todos App</h2>
            <input
                className="new-todo"
                placeholder="What needs to be done?"
                value={text}
                autoFocus={true}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />
        </header>
    )
};

export default Header;
