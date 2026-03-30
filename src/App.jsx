import React from 'react'
import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  
  const loadTodos = async () => {
    console.log('Loading todos...');

    const response = await axios.get('http://localhost:8020/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    const response = await axios.post('http://localhost:8020/todos', { todo: newTodo });
    setNewTodo("");
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <div className='todo-items-container'>
      {todos.map((todo, index) => (
        <div key={index} className="todo-card" >
          <h3>{todo}</h3>
        </div>
      ))}
      </div>
      <div className='todo-add-container'>
        <input type='text' 
          placeholder='Add todo'
          className='input-todo'
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}/>
          <button className='add-button' onClick={addTodo} >Add Todo</button>
      </div>

    </div>
  )
}

export default App