import React, {useEffect, useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import MyButton from "./components/UI/button/MyButton";
import MyLoad from "./components/UI/load/MyLoad";
import Undo from "./components/Undo";


function App() {
    //TODO Drag'n'Drop таксов

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
    const [isUndo, setIsUndo] = useState(-1);

    useEffect( () => {
        if (localStorage.length === 0){
            async function fetchData(){
                try{
                    let response = await fetch(urlTODO + "?_limit=1");
                    if (response.ok) {
                        let answer = await response.json();
                        answer.map((todo) => addNewTask({id:todo.id, done: todo.completed, text: todo.title}));
                        setIsDataLoaded(true)
                    }
                    else
                        console.log(`Ошибка загрузки данных: ${response.status}`)
                }
                catch (e){
                    console.log(`Произошла ошибка: ${e}`)
                }
            }
            fetchData();
            localStorage.setItem('tasks', '[]');
        }
        else{
            JSON.parse(localStorage.tasks).forEach(task =>{
                // console.log(task);
                addNewTask(task);
            })
            setIsDataLoaded(true);
        }
    }, [])




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
        store.forEach((task => {
                if (task.id === id)
                    task.done = checkbox;
            }
        ))
        localStorage.tasks = JSON.stringify(store);
    }

    let removeTask = (task_unit) =>{
        setTasks(tasks.filter(task => task.id !== task_unit.id))
        let store = JSON.parse(localStorage.tasks);
        store = store.filter(task => task.id !== task_unit.id);
        localStorage.tasks = JSON.stringify(store);
        // setIsUndo(task_unit.id);
    }





  return (
    <div className="App">
        {/*{isUndo !== -1 && <Undo undoState={{isUndo, setIsUndo}} addNewTask={addNewTask}></Undo>}*/}

        <div className="content">
            <header>
                <div className="burger" onClick={(e) => {
                    e.currentTarget.classList.toggle('--activeMenuBurger');
                    e.currentTarget.children[0].classList.toggle("--activeMenuBurger");

                    const menu = document.querySelector(".menu__wrapper");
                    menu.classList.toggle("--activeMenuWrapper")
                }}>
                    <span></span>
                </div>

                <div className="header__title">
                    <h1 >TODO LIST</h1>
                </div>
                <div className="addTask --smallBtn">
                    <MyButton disabled={!isDataLoaded} onClick={() => setIsModal(true)}>Add task</MyButton>
                    <MyButton disabled={!isDataLoaded} onClick={() => setIsModal(true)}>Add task</MyButton>
                </div>

                <div className="menu__wrapper">
                    <div className="menu">
                        <nav>
                            <h2 className={"menu__title"}>Навигация</h2>
                            <a href={"#Undone Tasks"}>Undo tasks</a>
                            <a href={"#Done Tasks"}>Done tasks</a>
                        </nav>
                    </div>
                </div>

            </header>


            {isModal &&
                <TaskForm isModal={isModal} addNewTask={addNewTask} closeModal={closeModal}/>
            }

            {/*Отрисовка Элементов TASKLIST либо myLoad*/}
            {!isDataLoaded && <MyLoad/>}
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
