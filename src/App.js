import React, {useEffect, useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import MyButton from "./components/UI/button/MyButton";
import MyLoad from "./components/UI/load/MyLoad";


function App() {
    //TODO Drag'n'Drop таксов
    //TODO Сохранение в куки
    const [tasks, setTasks] = useState([
        // {
        //     // id: 1,
        //     // done:false,
        //     // text: "здарова отец"
        // }
    ]);
    const  urlTODO = "https://jsonplaceholder.typicode.com/todos";
    const [isModal, setIsModal] = useState(false)
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isUndo, setIsUndo] = useState(false);

    useEffect( () => {
        if (localStorage.length === 0){
            getTodos().then(setIsDataLoaded(true));
            localStorage.setItem('tasks', '[]');
        }
        else{
            JSON.parse(localStorage.tasks).forEach(task =>{
                console.log(task);
                addNewTask(task);
            })
            setIsDataLoaded(true);
        }
    },[])


     async function getTodos (){
        try{
            let response = await fetch(urlTODO + "?_limit=5");
            if (response.ok) {
                let answer = await response.json();
                answer.map((todo) => addNewTask({id:todo.id, done: todo.completed, text: todo.title}));
            }
            else
                console.log(`Ошибка загрузки данных: ${response.status}`)
        }
        catch (e){
            console.log(`Произошла ошибка: ${e}`)
        }
    }

    let addNewTask = (newTask) =>{
        setTasks(tasks => [...tasks, newTask])

        let store = JSON.parse(localStorage.tasks);
        if (!localStorage.tasks.includes(JSON.stringify(newTask))){
            store.push(newTask);
            localStorage.tasks = JSON.stringify(store);
        }
    }

    let closeModal = () =>{setIsModal(false)}

    let checkBox_set = (id, checkbox) =>{
        setTasks(tasks.map(task =>
            task.id === id
            ?{...task, done:checkbox}
            : task
        ))
        let store = JSON.parse(localStorage.tasks);
        store.map((task => {
                if (task.id === id)
                    task.done = checkbox;
            }
        ))
        localStorage.tasks = JSON.stringify(store);
    }

    let undoTimer;

    let removeTask = (task_unit) =>{
        setTasks(tasks.filter(task => task.id !== task_unit.id))
        // let storeArr = localStorage.tasks.split('{');
        // let newStore = "[";
        // for (let i = 1; i < storeArr.length; i++)
        //     if (!storeArr[i].includes(task_unit.id))
        //         newStore += "{" + storeArr[i];
        //     else if (i === storeArr.length - 1)
        //         newStore = newStore.slice(0, newStore.length-1) + "]";

        // undoTimer = setTimeout(() => {
        //     console.log("начинаю удалять");
        //     let store = JSON.parse(localStorage.tasks);
        //     store = store.filter(task => task.id !== task_unit.id);
        //     localStorage.tasks = JSON.stringify(store);
        //
        // }, 5000)
        // setIsUndo(true);

            let store = JSON.parse(localStorage.tasks);
            store = store.filter(task => task.id !== task_unit.id);
            localStorage.tasks = JSON.stringify(store);
    }

  return (
    <div className="App">
        <div style={{display: !isUndo? 'none': 'flex'}} className="undo">
            <span>task is removed</span>
            <MyButton onClick={() => {
                addNewTask()
                clearTimeout(undoTimer);
                setIsUndo(false);
            }}>UNDO</MyButton>
        </div>

        <div className="content">
          <h1 style={{textAlign:"center", fontSize:"36px"}}>TODO LIST</h1>

          <div className="addTask">
              <MyButton disabled={!isDataLoaded} onClick={() => setIsModal(true)}>Add task</MyButton>
          </div>

          <TaskForm isModal={isModal} addNewTask={addNewTask} closeModal={closeModal}/>

          {!isDataLoaded &&
              <MyLoad/>
          }
          {isDataLoaded &&
              <TaskList
                  setCheck={checkBox_set}
                  tasks={tasks.filter(task => task.done === false)}
                  removeTask={removeTask}
                  title={"Undone Tasks"}
              />
          }
          {isDataLoaded &&
              <TaskList
                  setCheck={checkBox_set}
                  tasks={tasks.filter(task => task.done !== false)}
                  removeTask={removeTask}
                  title={"Done Tasks"}
              />
          }



        </div>
    </div>
  );
}

export default App;
