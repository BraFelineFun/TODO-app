import React, {useEffect} from 'react';
import MyButton from "./UI/button/MyButton";

const Undo = ({addNewTask, undoState}) => {


    useEffect( () =>{
        console.log('UseEffect ' + undoState.isUndo.task_id)

        let undoTimer = setTimeout((_undoState = undoState) => {
            console.log('удаление элемента' + _undoState.isUndo.task_id)
            let store = JSON.parse(localStorage.tasks);
            store = store.filter(task => task.id !== _undoState.isUndo.task_id);
            localStorage.tasks = JSON.stringify(store);

            _undoState.setIsUndo({show: false, task_id: 0});
        }, 5000)

        console.log("timer id = " + undoTimer);


        return () =>{
            clearTimeout(undoTimer);
            console.log("удаление компонента");
        }
    }, [undoState])


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