import React, {useEffect, useState} from 'react';
import MyButton from "./UI/button/MyButton";

const Undo = ({addNewTask, undoState}) => {

    const timeoutTime = 5 * 1000; //set in seconds


    // const [currentUndo, setCurrentUndo] = useState(undoState.isUndo);

    // useEffect(() =>{
    //     console.log("currentUndo = " + currentUndo);
    // }, [currentUndo])

    function deleteEl(){
        console.log('удаление элемента' + undoState.isUndo)
        let store = JSON.parse(localStorage.tasks);
        store = store.filter(task => task.id !== undoState.isUndo);
        localStorage.tasks = JSON.stringify(store);

        undoState.setIsUndo(-1);
    }


    useEffect( () =>{
        let undoTimer = setTimeout(deleteEl, timeoutTime)

        console.log("timer id = " + undoTimer);


        return () =>{
            if (undoState.isUndo === -1)
            {
                console.log("удаление таймера " + undoTimer)
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
                let undoTask = JSON.parse(localStorage.tasks).filter(task => task.id === undoState.isUndo)[0];
                addNewTask(undoTask);
                undoState.setIsUndo(-1);
                // setCurrentUndo(-1);
            }}>UNDO</MyButton>
        </div>
    );
};

export default Undo;