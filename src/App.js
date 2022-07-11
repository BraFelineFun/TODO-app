import React, {useEffect, useRef, useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import MyLoad from "./components/UI/load/MyLoad";
import Header from "./components/Header";
import LoginModal from "./components/LoginModal";
import UserUpdate from "./components/UserUpdate";
import {DefaultUser, UserData} from "./UserData";
import Modal from "./components/UI/modal/modal";


function App() {
    const [tasks, setTasks] = useState([
        // {
        //     // id: 1,
        //     // done:false,
        //     // text: "здарова отец"
        // }
    ]);
    const  urlTODO = "https://jsonplaceholder.typicode.com/todos";
    const [isModal, setIsModal] = useState(false)
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isUndo, setIsUndo] = useState(-1);
    const [user, setUser] = useState({...UserData[0], loggedIn:true}); //useState(DefaultUser);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 806);
    const [listPage, setListPage] = useState(0);
    const taskList = []; //sets in getTaskList

    const ref = useRef(null);

    useEffect( () => {
        window.addEventListener('resize', debouncedSetIsMobile);
        if (localStorage.length === 0){
            async function fetchData(){
                try{
                    let response = await fetch(urlTODO + "?_limit=5");
                    if (response.ok) {
                        let answer = await response.json();
                        answer.map((todo) => addNewTask({id:todo.id, done: todo.completed, text: todo.title}));
                        setTimeout(() =>{setIsDataLoaded(true)}, 500);
                        ref.current.classList.add('.--loaded');
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
            setTimeout(() =>{setIsDataLoaded(true)}, 500);
            ref.current.classList.add('.--loaded');
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
        console.log("перерисовка"); //------Почему столько раз вызываается

        {/*Отрисовка Элементов TASK LIST*/}
        if(isMobile)
            return taskList[listPage];
        else
            return taskList;
    }


  return (
    <div className="App">
        {/*{isUndo !== -1 && <Undo undoState={{isUndo, setIsUndo}} addNewTask={addNewTask}></Undo>}*/}

        {!isDataLoaded && <MyLoad ref={ref}/>}
        <div className="content">
            <Header
                setListPage={setListPage}
                isMobile={isMobile}
                setIsLoginModal={setIsLoginModal}
                user={user}
                setIsModal={setIsModal}
                isDataLoaded={isDataLoaded}
            />
            {isModal &&
                <TaskForm addNewTask={addNewTask} setModal={setIsModal}/>
            }

            {isLoginModal && !user.loggedIn &&
                <LoginModal setUser={setUser} user={user} setIsLoginModal={setIsLoginModal}/>
            }
            {isLoginModal && user.loggedIn &&
                <UserUpdate setUser={setUser} user={user} setIsUpdateModal={setIsLoginModal}/>
            }

            {/*<Modal typeMessage={true}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aliquam assumenda consequatur cupiditate ducimus ea earum exercitationem facere illo incidunt iure libero minima nobis odit provident reiciendis, reprehenderit similique ut!</Modal>*/}

            {/*Draw a list*/}
            {getTaskList()}


        </div>
    </div>
  );
}

export default App;
