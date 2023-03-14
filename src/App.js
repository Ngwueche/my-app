import React, {useState, useRef, useEffect} from 'react';
import {v4 as uuidv4} from 'uuid';
import TodoList from './TodoList';
// import './App.css';
  const LOCAL_STORAGE_KEY = 'todoApp.todos'

export default function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  useEffect(()=>{
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])

  useEffect (()=>{
    if (todos.length > 0) localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

function toggleTodo(id){
  const newTodos = [...todos]
  const todo = newTodos.find(todo => todo.id === id)
  todo.completed = !todo.completed
  setTodos(newTodos);
}

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos =>{
      return [...prevTodos, {id: uuidv4(), name:name, completed: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodo(e){
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }
  return (
    <div >
      <h1>My ToDo List</h1>
      <TodoList todos = {todos} toggleTodo={toggleTodo}/>
      <input ref= {todoNameRef} type="text" />
      <button onClick={handleAddTodo}>Add Todos</button>
      <button onClick={handleClearTodo}>Clear Completed</button>
      <div>{todos.filter(todo=>!todo.completed).length} left Todos</div>
    </div>

 );
}

