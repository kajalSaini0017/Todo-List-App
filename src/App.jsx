import Todo from './Components/todo'
import './App.css'
import { useState, useEffect } from 'react';

function App() {

  const [dateTime, setDateTime] = useState("")
  
  useEffect(() => {
     const interval = setInterval(() => {
      const now = new Date();
      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();
      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return ()=> clearInterval(interval);
  },[]);

 return (
    <>
      <h1>Todo List App</h1>
      <h2 className='date-time'>{dateTime}</h2>
      <Todo />
      
    </>
  )
}


export default App
