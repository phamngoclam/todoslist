import React from 'react';
import Header from "./components/features/header/Header/Header";
import TodoList from "./components/features/todos/TodosList";
import Footer from "./components/features/footer/Footer";
import './App.scss';

function App() {
    return (
        <div className="App">
            <Header/>
            <TodoList/>
            <Footer/>
        </div>
    );
}

export default App;
