import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";

const Undo = ({addNewTask, undoState}) => {

    const timeoutTime = 5 * 1000; //set in seconds

    const [currentUndo, setCurrentUndo] = useState({task_id: undoState.isUndo.task_id, show: undoState.isUndo.show});

    useEffect(() =>{
        console.log("currentUndo = " + currentUndo.show);
    }, [currentUndo])

    useEffect( () =>{
        // console.log('UseEffect ' + undoState.isUndo.task_id)

        let undoTimer = setTimeout(_ => {
            console.log('удаление элемента' + currentUndo.task_id)
            let store = JSON.parse(localStorage.tasks);
            store = store.filter(task => task.id !== currentUndo.task_id);
            localStorage.tasks = JSON.stringify(store);

            undoState.setIsUndo({show: false, task_id: 0});
        }, timeoutTime)

        console.log("timer id = " + undoTimer);


        return () =>{
            if (!currentUndo.show)
            {
                console.log("удаление таймера")
                clearTimeout(undoTimer);
            }
            else
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
                setCurrentUndo({show:false, task_id: 0});
            }}>UNDO</MyButton>
        </div>
    );
};

export default Undo;