import React, {useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";


function App() {
    const [tasks, setTasks] = useState([
        {id:1, done:true, text:"Здарова, отец"},
        {id:2, done:false, text:"Пока, отец"},
        {id:3, done:false, text:"Доброго времени суток, отец "},
    ]);
    const [isModal, setIsModal] = useState(false)
    const [newTask, setNewTask] = useState({
        name:'',
        description:''
    })

    let createNewTask = () =>{
        const newTaskObj = {
            id: Date.now(),
            done:false,
            text: newTask.name
        }
        setIsModal(false)
        setTasks([...tasks, newTaskObj])
        setNewTask({name: '', description: ''})
    }

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
          <button onClick={() => setIsModal(true)}>Add task</button>

          <div
              style={{display: isModal === true ? "flex" :"none"}}
              className="modal__wrapper"
          >
              <div className="modal">
                  <div className="modal__img">
                      <img
                          src="https://cdn.onlinewebfonts.com/svg/download_32988.png"
                          alt="close"
                          onClick={() => setIsModal(false)}
                      />
                  </div>

                  <h2>Add a new task</h2>
                  <div className="modal__form">
                      <div className="modal__inputData">
                          <label htmlFor="taskName">Enter a task's name</label>
                          <input
                              value={newTask.name}
                              onChange={e => {
                                  setNewTask({...newTask, name:e.target.value})
                              }}
                              id={"taskName"}
                              placeholder={"Enter name"}
                              type="text"
                          />
                      </div>
                      <div className="modal__inputData">
                          <label htmlFor="">Enter a task's description</label>
                            <input
                                value={newTask.description}
                                onChange={e => {
                                    setNewTask({...newTask, description:e.target.value})
                                }}
                                disabled
                                type="text"
                            />
                      </div>
                  </div>
                  <button onClick={createNewTask}>Add</button>
              </div>
          </div>

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
