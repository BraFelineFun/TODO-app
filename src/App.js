import React, { useEffect, useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import MyLoad from "./components/UI/load/MyLoad";
import Header from "./components/Header";


function App() {
    //TODO Drag'n'Drop таксов
    // TODO попробовать сделать undo при помощи списка и дебаунсера

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
    const [userName, setUserName] = useState("Vlad");
    const [isMobile, setIsMobile] = useState(window.innerWidth < 806);
    const [listPage, setListPage] = useState(0);
    const taskList = []; //sets in getTaskList



    useEffect( () => {
        window.addEventListener('resize', debouncedSetIsMobile);
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
        return (_ => window.removeEventListener('resize', debouncedSetIsMobile))
    }, [])





    //Debounce function to prevent multiply state change,
    // but probably might have problems if used many Times
    // because this in function uses window context
    function debounce(callee, timeoutMs) {
        return function perform(...args) {
            let previousCall = this.lastCall;
            this.lastCall = Date.now();
            if (previousCall && this.lastCall - previousCall <= timeoutMs) {
                clearTimeout(this.lastCallTimer);
            }
            this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs);
        };
    }
    let setter = () =>{
        setIsMobile(window.innerWidth < 806)
    }
    const debouncedSetIsMobile = debounce(setter, 50);




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

    function getTaskList(){

        //works only once - to fill task List
        if(!taskList.length){
            taskList.push(
                <TaskList
                    setCheck={checkBox_set}
                    tasks={tasks.filter(task => task.done === false)}
                    removeTask={removeTask}
                    title={"Undone Tasks"}
                />,
                <TaskList
                    setCheck={checkBox_set}
                    tasks={tasks.filter(task => task.done !== false)}
                    removeTask={removeTask}
                    title={"Done Tasks"}
                />
            )
        }
        // console.log("перерисовка") ------Почему столько раз вызываается

        {/*Отрисовка Элементов TASK LIST либо myLoad*/}
        if (!isDataLoaded)
            return <MyLoad/>;
        else{
            if(isMobile)
                return taskList[listPage];
            else
                return taskList;
        }

    }



  return (
    <div className="App">
        {/*{isUndo !== -1 && <Undo undoState={{isUndo, setIsUndo}} addNewTask={addNewTask}></Undo>}*/}

        <div className="content">
            <Header
                setListPage={setListPage}
                isMobile={isMobile}
                userName={userName}
                setIsModal={setIsModal}
                isDataLoaded={isDataLoaded}
            />
            {isModal &&
                <TaskForm isModal={isModal} addNewTask={addNewTask} closeModal={closeModal}/>
            }


            {/*Draw a list*/}
            {getTaskList()}


        </div>
    </div>
  );
}

export default App;
