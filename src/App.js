import logo from './logo.svg';
// import './App.css';
import Header  from './components/Header';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import React from 'react';
import { useState , useEffect} from 'react'

function App  ()  {
  const [showAddTask,setShowAddTask]= useState(false)
  const [tasks,setTasks] = useState( [ ])

  useEffect(()=>{
     const getTasks= async () => {
      const tasksFormServer = await fetchTasks()
      setTasks(tasksFormServer)
     }
      getTasks()
    
  },[])

 //fetch task
 const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  

  return data
}
 
 

//Add Task
const addTask =async(task) => {

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-type ': 'application/json',
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()
  setTasks([...tasks,data])
  // const id = Math.floor(Math.random() * 1000)+1 
  // const newTask = { id, ...task}
  // setTasks ([...tasks,newTask])

  
}

//Delete task

  const deleteTask = async(id) =>{

    await fetch(`http://localhost:5000/tasks/${id}`,{
      method: 'DELETE'
    })
    
    setTasks(tasks.filter((tasks) => tasks.id !== id))
  }
//Toggle reminder
  const toggleReminder =(id) => {
     setTasks ( tasks.map((tasks) => tasks.id === id ? {...tasks, reminder: !tasks.reminder}: tasks))
  }

  return (
   
    <div className="App">
      <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
    {showAddTask && <AddTask onAdd ={addTask}/>}
      {tasks.length> 0 ?
       (<Tasks tasks={tasks} onDelete={deleteTask}  onToggle= {toggleReminder}/>) : ( 'No Task Show')}
    </div>
    

  );
}

export default App;
