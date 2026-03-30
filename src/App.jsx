import React from 'react'
import './App.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  
  const loadTodos = async () => {
    console.log('Loading todos...');

    const response = await axios.get('http://localhost:8020/todos');
    setTodos(response.data);
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      {todos.map((todo, index) => (
        <div key={index} className="todo-card" >
          <h3>{todo}</h3>
        </div>
      ))}
    </div>
  )
}

export default App