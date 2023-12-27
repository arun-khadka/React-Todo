import { useState } from 'react'
import './App.css'

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false)


  return (
    <div className='App'> 
       <h2>Todo List</h2> 

      <div className='todo-wrapper'>
         <div className='todo-input'>
          
          <div className='todo-input-item'>
            <label>Title</label>
            <input type='text' className='form-input' placeholder=''/>
          </div>

          <div className='todo-input-item'>
            <label>Description</label>
            <input type='text' className='form-input' placeholder=''/>
          </div>

          <div className='todo-input-item'>
            <button type='button' className='primaryBtn'>Add</button>
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
          <div className='todo-list-item'>
            <h3>Task 1</h3>
            <p>This is task 1</p>
          </div>  
        </div> 

      </div>  
    </div>
 )

}

export default App
