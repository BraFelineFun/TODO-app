import React, {useEffect, useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import MyButton from "./components/UI/button/MyButton";


function App() {
    //TODO получение данных с сервера
    //TODO Drag'n'Drop таксов
    //TODO Сохранение в куки
    const [tasks, setTasks] = useState([
        {id:1, done:true, text:"Здарова, отец"},
        {id:2, done:false, text:"Пока, отец"},
        {id:3, done:false, text:"Доброго времени суток, отец "},
    ]);
    const  urlTODO = "https://jsonplaceholder.typicode.com/todos";
    const [isModal, setIsModal] = useState(false)

    useEffect( () => {
        getTodos()
    },[])

     async function getTodos (){
        let response;
        try{
            let response = await fetch(urlTODO + "?_limit=10");
            if (response.ok) {
                let answer = await response.json();
                answer.map((todo) => addNewTask({name: todo.title}));
            }
            else
                console.log(`Ошибка загрузки данных: ${response.status}`)
        }
        catch (e){
            console.log(`Произошла ошибка: ${e}`)
        }
    }

    let addNewTask = (newTask) =>{
        const newTaskObj = {
            id: Date.now(),
            done:false,
            text: newTask.name
        }
        setTasks(tasks => [...tasks, newTaskObj])

    }

    let closeModal = () =>{setIsModal(false)}

    let checkBox_set = (id, checkbox) =>{
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
          <div className="loading">
              <svg className="spinner" viewBox="0 0 50 50">
                  <circle className="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
              </svg>
          </div>
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
