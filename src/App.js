import React, {useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import MyButton from "./components/UI/button/MyButton";


function App() {
    const [tasks, setTasks] = useState([
        {id:1, done:true, text:"Здарова, отец"},
        {id:2, done:false, text:"Пока, отец"},
        {id:3, done:false, text:"Доброго времени суток, отец "},
    ]);
    const [isModal, setIsModal] = useState(false)


    let addNewTask = (newTask) =>{
        const newTaskObj = {
            id: Date.now(),
            done:false,
            text: newTask.name
        }
        setIsModal(false)
        setTasks([...tasks, newTaskObj])

    }

    let closeModal = () =>{setIsModal(false)}

    let checkBox_set = (id, checkbox) =>{
        console.log("меняем чекбокс")
        setTasks(tasks.map(task =>
            task.id === id
            ?{...task, done:checkbox}
            : task
        ))
    }
    let removeTask = (task_unit) =>{
        console.log("удаляем")
        setTasks(tasks.filter(task => task.id !== task_unit.id))
    }

  return (
    <div className="App">
      <div className="content">

          <h1 style={{textAlign:"center", fontSize:"36px"}}>TODO LIST</h1>

          <div className="addTask">
              <MyButton onClick={() => setIsModal(true)}>Add task</MyButton>
          </div>

          <TaskForm isModal={isModal} addNewTask={addNewTask} closeModal={closeModal}/>

          <TaskList
              setCheck={checkBox_set}
              tasks={tasks.filter(task => task.done === false)}
              removeTask={removeTask}
              title={"Undone Tasks"}
          />
          <TaskList
              setCheck={checkBox_set}
              tasks={tasks.filter(task => task.done !== false)}
              removeTask={removeTask}
              title={"Done Tasks"}
          />

      </div>
    </div>
  );
}

export default App;
