import React, {useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";


function App() {
    const [tasks, setTasks] = useState([
        {id:1, done:true, text:"Здарова, отец"},
        {id:2, done:false, text:"Пока, отец"},
        {id:3, done:false, text:"Доброго времени суток, отец"},
    ]);
  return (
    <div className="App">
      <div className="content">

          <h1 style={{textAlign:"center", fontSize:"36px"}}>TODO LIST</h1>

          <TaskList setTasks={setTasks} tasks={tasks}/>

      </div>
    </div>
  );
}

export default App;
