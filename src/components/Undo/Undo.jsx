import React, {useEffect, useState} from 'react';
import MyButton from "../UI/button/MyButton";
import classes from "./Undo.module.css"

/*
    after pressing delete button task removes from the state
    component appears and sets a timeout to delete it from the localStorage
    if undo button is pressed, the last deleted task will be added to task list backwards
    otherwise it removes from a storage
*/
const Undo = ({addNewTask, setIsUndo, lastRemovedTask, setLastRemovedTask}) => {

    const timeoutTime = 5 * 1000; //set in seconds
    let thisElToRemove = lastRemovedTask; //Copy of state for local usage in delete and clearTimeOut func


    function deleteEl(thisRemoveEl){
        let store = JSON.parse(localStorage.tasks);
        store = store.filter(task => task.id !== thisRemoveEl);
        localStorage.tasks = JSON.stringify(store);

        setIsUndo(false);
    }


    useEffect( () => {
        let undoTimer = setTimeout(() => deleteEl(thisElToRemove), timeoutTime)
        return () =>{
            if (thisElToRemove === -1)
                clearTimeout(undoTimer);
        }
    }, [lastRemovedTask])


    return (
        <div  className={classes.undo}>

            <span>task is removed</span>
            <MyButton onClick={() => {
                let undoTask = JSON.parse(localStorage.tasks).filter(task => task.id === lastRemovedTask)[0];
                addNewTask(undoTask);
                thisElToRemove = -1;
                setLastRemovedTask(-1);
                setIsUndo(false);
            }}>
                UNDO
            </MyButton>
        </div>
    );
};

export default Undo;