// import { useState } from 'react'
// import {AiOutlineDelete} from 'react-icons/ai';
// import {BsCheckLg} from 'react-icons/bs';
// import './App.css'

// const MultipleInputs = () => {
//   const [allTodos, setTodos] = useState([]);
  
//   const [newTitle, setNewTitle] = useState("");
//   const [newDescritpion, setNewDescription] = useState("");
//   const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  

//   const handleAddTodo = (e) => {
//     const newTodo = {
//       id:Date.now(),
//       Title: '',
//       Description: '',
//     }
//     setTodos([...allTodos, newTodo]);
//     };

//   const handleSubmit = (index) => {
//     return(e) => {
//       e.preventDefault();
//       console.log(allTodos[index]);
//       setNewTitle(allTodos[index].Title);
//       setNewDescription(allTodos[index].Description);
//     };
//   };

//   return (
    // <div className='App'> 
    //    <h2>Todo List</h2> 

    //   <div className='todo-wrapper'>
    //      <div className='todo-input'>
          
    //       <div className='todo-input-item'>
    //         <label htmlFor='title-input'>Title</label>
    //          <input 
    //           id='title-input'
    //           type='text' 
    //           value={allTodos[allTodos.length - 1]?.Title} 
    //           onChange={(e) => {
    //             const updatedTodo = {...allTodos[allTodos.length - 1], Title: e.target.value};
    //             handleAddTodo(updatedTodo);
    //           }} 
    //           name='Title'/>
    //       </div>

    //       <div className='todo-input-item'>
    //         <label htmlFor='description-input'>Description</label>
    //          <input 
    //           id='description-input'
    //           type='text' 
    //           value={allTodos[allTodos.length - 1]?.Description} 
    //           onChange={(e) => {
    //             const updatedTodo = {...allTodos[allTodos.length - 1], Description: e.target.value};
    //             handleAddTodo(updatedTodo);
    //           }} 
    //           name='Description'/>
    //       </div>

    //       <div className='todo-input-item'>
    //         <button 
    //           type='button' 
    //           onClick={() => {
    //             const updatedTodo = {...allTodos[allTodos.length - 1], Title: '', Description: ''};
    //             handleAddTodo(updatedTodo)
    //           }} 
    //           className='primaryBtn'>Add
    //         </button>
    //       </div>
    //     </div>

    //     <div className='btn-area'>
    //       <button 
    //       className={`secondaryBtn ${isCompleteScreen===false} && 'active'}`} 
    //       onClick={() => isCompleteScreen(true)}>Todo
    //       </button>

    //       <button 
    //       className={`secondaryBtn ${isCompleteScreen===true} && 'active'}`} 
    //       onClick={() => isCompleteScreen(false)}>Completed
    //       </button>
          
    //     </div>

    //     <div className='todo-list'>
    //       {allTodos.map((todo, index) => (
    //         <div className='todo-list-item' key={todo.id}>
    //         <h3>{todo.Title}</h3>
    //         <p>{todo.Descritpion}</p>
    //       </div>
    //       ))}
          
        
    //       <div>
    //         <AiOutlineDelete className='icon'/>
    //         <BsCheckLg className='check-icon'/>
    //       </div>  
    //     </div> 
    //   </div>  
    // </div>
//  )

// }


// export default MultipleInputs

import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App () {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newDescription, setNewDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");

    const handleAddTodo = () => {
        let newTodoItem = {
            title: newTitle,
            description: newDescription
        }

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.push(newTodoItem);
        setTodos(updatedTodoArr);
    }

    return(

        <div className='App'> 
        <h2>Todo List</h2> 

        <div className='todo-wrapper'>
        <div className='todo-input'>
        
        <div className='todo-input-item'>
            <label>Title</label>
            <input 
            type='text' 
            value={newTitle} 
            onChange={(e) => 
                setNewTitle(e.target.value)}
                />
        </div>

        <div className='todo-input-item'>
            <label>Description</label>

            <input 
            type='text' 
            value={newDescription} 
            onChange={(e) => 
            setNewDescription(e.target.value)}
            />
        </div>

        <div className='todo-input-item'>
            <button 
            type='button' 
            onClick={handleAddTodo} 
            className='primaryBtn'>Add
            </button>
        </div>

        </div>

        <div className='btn-area'>
        <button 
        className={`secondaryBtn ${isCompleteScreen===false} && 'active'}`} 
        onClick={() => isCompleteScreen(true)}>Todo
        </button>

        <button 
        className={`secondaryBtn ${isCompleteScreen===true} && 'active'}`} 
        onClick={() => isCompleteScreen(false)}>Completed
        </button>
        
        </div>

        <div className='todo-list'>
            {allTodos.map((item, index)=>{
                return(
                    <div className='todo-list-item' key={index}>
                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
        
                        <div>
                            <AiOutlineDelete className='icon'/>
                            <BsCheckLg className='check-icon'/>
                        </div>
                        
                    </div>    
                )
            })}    
        
        </div> 
      </div>  
     </div>
    )
}
export default App;