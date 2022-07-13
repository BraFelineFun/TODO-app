import React, { useEffect, useMemo, useRef, useState} from "react";
import './styles/App.css'
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import MyLoad from "./components/UI/load/MyLoad";
import Header from "./components/Header/Header";
import LoginModal from "./components/Login&Update/LoginModal";
import UserUpdate from "./components/Login&Update/UserUpdate";
import {DefaultUser, UserData} from "./UserData";
import {useDebounce} from "./hooks/useDebounce";
import Undo from "./components/Undo/Undo";


function App() {
    const [tasks, setTasks] = useState([]);
    const  urlTODO = "https://jsonplaceholder.typicode.com/todos";
    const [isModal, setIsModal] = useState(false)
    const [isLoginModal, setIsLoginModal] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [lastRemovedTask,setLastRemovedTask] = useState(-1);
    const [isUndo, setIsUndo] = useState(false);

    const [user, setUser] = useState({...UserData[0], loggedIn:true}); //useState(DefaultUser);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 806);
    const [pageNumber, setPageNumber] = useState(0); //Number of page to draw




    const ref = useRef(null);


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

    useEffect(() => {
        window.addEventListener('resize', debouncedSetIsMobile);
        if (!localStorage.getItem('tasks')){
            fetchData();
            localStorage.setItem('tasks', '[]');
        }
        else{
            JSON.parse(localStorage.tasks).forEach(task =>{
                addNewTask(task);
            })
            setTimeout(() =>{setIsDataLoaded(true)}, 500);
            ref.current.classList.add('.--loaded');
        }

        return (_ => window.removeEventListener('resize', debouncedSetIsMobile))
    }, [])

    const debouncedSetIsMobile = useDebounce(() =>{
        setIsMobile(window.innerWidth < 806)
    }, 50);




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
        setIsUndo(true);
        setLastRemovedTask(task_unit.id);
    }

    const listOfPages = useMemo(() => {
        return [
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
        ]}, [tasks]); //pages (UnDone, Done)

    const taskList2 = useMemo(() => {
        if(isMobile)
            return listOfPages[pageNumber];
        else
            return listOfPages;
    }, [listOfPages, pageNumber, isMobile]) //Memorized list of pages to draw

  return (
    <div className="App">
        {isUndo &&<Undo setIsUndo={setIsUndo} setLastRemovedTask={setLastRemovedTask} lastRemovedTask={lastRemovedTask} addNewTask={addNewTask}></Undo>}

        {!isDataLoaded &&
            <MyLoad ref={ref}/>
        }
        <div className="content">
            <Header
                setPageNumber={setPageNumber}
                isMobile={isMobile}
                setIsLoginModal={setIsLoginModal}
                user={user}
                setIsModal={setIsModal}
                isDataLoaded={isDataLoaded}
            />
            {isModal &&
                <TaskForm
                    addNewTask={addNewTask}
                    setModal={setIsModal}
                />
            }

            {isLoginModal && !user.loggedIn &&
                <LoginModal setUser={setUser} user={user} setIsLoginModal={setIsLoginModal}/>
            }
            {isLoginModal && user.loggedIn &&
                <UserUpdate setUser={setUser} user={user} setIsUpdateModal={setIsLoginModal}/>
            }


            {/*Draw memorized list*/}
            {taskList2}


        </div>
    </div>
  );
}

export default App;
