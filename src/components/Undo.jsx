import React, {useEffect} from 'react';
import MyButton from "./UI/button/MyButton";

const Undo = ({addNewTask, undoState}) => {


    useEffect( () =>{
        let undoTimer = setTimeout(() => {

            let store = JSON.parse(localStorage.tasks);
            store = store.filter(task => task.id !== undoState.isUndo.task_id);
            localStorage.tasks = JSON.stringify(store);

            undoState.setIsUndo({show: false, task_id: 0});
        }, 10000)

        return () =>{
            clearTimeout(undoTimer);
        }
    }, [])


    return (
        <div  className="undo">
            {/*При нажатии на кнопку удаления появляется этот блок,
            происходит удаление из State,
            удаление из localStorage не происходит,
            пока не истечет таймер*/}

            <span>task is removed</span>
            <MyButton onClick={() => {
                let undoTask = JSON.parse(localStorage.tasks).filter(task => task.id === undoState.isUndo.task_id)[0];
                addNewTask(undoTask);
                undoState.setIsUndo({show:false, task_id: 0});
            }}>UNDO</MyButton>
        </div>
    );
};

export default Undo;