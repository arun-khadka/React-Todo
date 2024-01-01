import React, {useState, useEffect} from 'react';
import './App.css';
import {AiOutlineDelete} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';

function App () {
    const [isCompleteScreen, setIsCompleteScreen] = useState(false);
    const [allTodos, setTodos] = useState([]);
    const [newDescription, setNewDescription] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [error, setError] = useState(false);
    const [completedTodos, setCompletedTodos] = useState([]);
    // const [startTodos, setStartTodos] = useState([]);


    const handleAddTodo = () => {
        if (newTitle === "" || newDescription === "") {
            alert('Please fill the required fields')
            setError(true);
            return;
        };

        let newTodoItem = {
            title: newTitle,
            description: newDescription,
        };


        // let date = new  Date();
        // let day = date.getDate();
        // let month = date.getMonth() + 1;
        // let year = date.getFullYear();
        // let hours = date.getHours();
        // let minutes = date.getMinutes();
        // let am_pm = hours >= 12 ? 'PM' : 'AM';

        // hours = hours % 12;
        // hours = hours ? hours : 12; // the hour '0' should be '12'
        // hours = (hours ? hours : 0).toString().padStart(2, '0');
        // minutes =  minutes < 10 ? '0' + minutes : minutes;
        // let strTime = hours + ' : ' + minutes + ' ' + am_pm;
        
        // if(month.length < 2)
        //     month = "0" + month;
        // if(day.length < 2)
        //     day = "0" + day;
        

        // let startDate = day + '-' + month + '-' + year + ' at ' + strTime ;

        // let filteredItem = {
        //     ...allTodos[index],
        //     startDate: startDate
        // }
        // filteredItem.startDate = startDate;

        

        let updatedTodoArr = [...allTodos];
        updatedTodoArr.unshift(newTodoItem);
        setTodos(updatedTodoArr);
        // console.log(updatedTodoArr); //for debugging purpose
        setNewTitle('');
        setNewDescription('');
        setError(false);
        localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
    }

    const handleDeleteTodo = (index) => {
        let reducedTodo = [...allTodos];
        // reducedTodo = reducedTodo.slice(0, index).concat(reducedTodo.slice(index + 1)); //same func
        reducedTodo.splice(index, 1);                                                      //same func
        setTodos(reducedTodo);
        localStorage.setItem('todolist',JSON.stringify(reducedTodo));  //deleting from local storage
    }

    const handleCompleteTodo = (index) => {
        let date = new  Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let am_pm = hours >= 12 ? 'PM' : 'AM';

        hours = hours % 12;
        hours = hours ? hours : 12;   //   the hour '0' should be '12'
        // hours = (hours ? hours : 0).toString().padStart(2, '0');          //same function
        hours = hours < 10 ? '0' + hours : hours;                            //same function
        minutes =  minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + am_pm;
        
        if(month.length < 2)
            month = "0" + month;
        if(day.length < 2)
            day = "0" + day;

        let completedOn = day + '-' + month + '-' + year + ' at ' + strTime ;

        let filteredItem = {
            ...allTodos[index],
            completedOn: completedOn
        }

        let updatedCompletedArr = [...completedTodos]
        updatedCompletedArr.unshift(filteredItem);
        setCompletedTodos(updatedCompletedArr);
        handleDeleteTodo(index);  //removes from todo after clicking check button
        localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr));

    }

    const handleDeleteCompletedTodo = (index) => {
        let reducedTodo = [...completedTodos];
        reducedTodo = reducedTodo.slice(0, index).concat(reducedTodo.slice(index + 1));
        setCompletedTodos(reducedTodo);
        localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));  //deleting from local storage
    }

    useEffect(()=>{
        let savedTodo = JSON.parse(localStorage.getItem('todolist'));
        let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));

        if(savedTodo)
            setTodos(savedTodo);
        
        if(savedCompletedTodo)
            setCompletedTodos(savedCompletedTodo)
        // console.log(savedTodo); //for debugging purpose
    }, [])

    return(

        <div className='App'> 
        <h2>To-do List</h2> 

        <div className='todo-wrapper'>
            <div className='todo-input'>  
                <div className='todo-input-item'>
                    <label>Title</label>
                    <input 
                        type='text' 
                        name='newTitle'
                        value={newTitle} 
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </div>

                <div className='todo-input-item'>
                    <label>Description</label>
                    <input 
                        type='text' 
                        name='newDescription'
                        value={newDescription} 
                        onChange={(e) => setNewDescription(e.target.value)}
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
                    className={`secondaryBtn ${isCompleteScreen===false && 'active'}`} 
                    onClick={() => setIsCompleteScreen(true)}>Todo
                </button>

                <button 
                    className={`secondaryBtn ${isCompleteScreen===true && 'active'}`} 
                    onClick={() => setIsCompleteScreen(false)}>Completed
                </button>
            </div>

            <div className='todo-list'>
                {isCompleteScreen == false && allTodos.map((item, index)=>{
                    return(
                        <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
            
                            <div>
                                <AiOutlineDelete 
                                    className='icon' 
                                    onClick={() => handleDeleteTodo(index)} 
                                    title='Delete?'
                                />
                                <BsCheckLg 
                                    className='check-icon' 
                                    onClick={() => handleCompleteTodo(index)} 
                                    title='Complete?'
                                />
                            </div>
                            
                        </div>    
                    )
                })}    

                {isCompleteScreen == true && completedTodos.map((item, index)=>{
                    return(
                        <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p1><small>Completed on<br></br> {item.completedOn} </small></p1>
                            </div>
            
                            <div>
                                <AiOutlineDelete 
                                    className='icon' 
                                    onClick={() => handleDeleteCompletedTodo(index)} 
                                    title='Delete?'
                                />
                            </div>
                        </div>    
                    )
                })}    

                {/* {isCompleteScreen == false && startTodos.map((item, index)=>{
                    return(
                        <div className='todo-list-item' key={index}>
                            <div>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <p><small><i><b>Started on:</b></i><br></br> {item.startDate}  </small></p>
                            </div>
            
                            <div>
                                <AiOutlineDelete 
                                    className='icon' 
                                    onClick={() => handleDeleteTodo(index)} 
                                    title='Delete?'
                                />
                            </div>
                        </div>    
                    )
                })}     */}
            </div> 
        </div>  
    </div>
    )
}
export default App;
