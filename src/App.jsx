import React from 'react'
import './App.css'
import deleteIcon from './assets/delete.png';
import editIcon from './assets/edit.png';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [oldtodo,setOldTodos] =useState("");
  const[editmode,setEditmode]= useState(false);
  
  const BASE_URL = 'https://todo-server-9hg3.onrender.com';

  const loadTodos = async () => {
    console.log('Loading todos...');

    const response = await axios.get(`${BASE_URL}/todos`);
    setTodos(response.data.data);
  };

  const addTodo = async () => {
    if(!newTodo.trim()) return;
    const response = await axios.post(`${BASE_URL}/todos`, { todoitem: newTodo });
    setNewTodo("");
    loadTodos();
  };

  const editTodo = async () => {
    const response = await axios.put(`${BASE_URL}/todos`, { oldtodoitem: oldtodo, newtodoitem: newTodo });
    setNewTodo("");
    setEditmode(false);
    loadTodos();
    setOldTodos("");
  };

  const deleteTodo = async (todo) => {
    const response = await axios.delete(`${BASE_URL}/todos`, { data: { todoitem: todo } });
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div>
      <h1>To-Do List</h1>
      <p className='sub-heading'>{editmode ? 'Editing Todo' : 'Add ToDo'}</p>
      <div className='todo-items-container'>
      {todos.map((todo, index) => {
        return(
        <div key={index} className="todo-card" >
          <h3>{todo}</h3>
          <div>
            <img src={editIcon} alt="Edit" className='edit-icon' onClick={() => {
              setOldTodos(todo);
              setNewTodo(todo);
              setEditmode(true);
            }} />
            <img src={deleteIcon} alt="Delete" className='delete-icon' 
                onClick = {() => {
                  deleteTodo(todo);
                }} />
          </div>
        </div>
        )
      })}
      </div>
      <div className='todo-add-container'>
        <input type='text' 
          placeholder='Add todo'
          className='input-todo'
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}/>
          <button className='add-button'
            onClick={() => {
              if(editmode){
                editTodo();
              }else{
                addTodo();
              }
            }}>
              {editmode ? 'Edit Todo' : 'Add Todo'}
            </button>  
      </div>

    </div>
  )
}

export default App