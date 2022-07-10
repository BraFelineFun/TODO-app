import React, {useEffect, useRef, useState} from 'react';
import MyInputText from "./UI/input/MyInput_text";

import MyButton from "./UI/button/MyButton";
import Modal from "./UI/modal/modal";


const TaskForm = ({addNewTask, isModal, setModal}) => {

    const [newTask, setNewTask] = useState({
        id: 0,
        done: false,
        text: ''
    })


    useEffect( () =>{
        function enterPressListener (e){
                if (e.key === 'Enter')
                    checkInput();
        }
        document.addEventListener('keyup', enterPressListener)
        return () =>{
            document.removeEventListener('keyup', enterPressListener)
        };
    })

    function checkInput(){
        if (newTask.text !== '')
            createNewTask()
        else
            alert("Empty Input")
    }

    function createNewTask (){
        addNewTask(newTask);
        setModal(false);
        setNewTask({id:0, done: false, text: ''})
    }

    //create an autoFocus on FirstInput
    const inputFocus = useRef();
    useEffect(_ =>{
        inputFocus.current.focus();
    })

    return (
        <Modal isModal={isModal} setModal={setModal}>

            <h2 className='modal__h2'>Add a new task</h2>
            <div className="modal__form">
                <div className="modal__inputData">
                    <label className='modal__label' htmlFor="taskName">Enter a task's name</label>
                    <MyInputText
                        ref={inputFocus}
                        value={newTask.text}
                        onChange={e => {
                            setNewTask({...newTask, id:Date.now(), text:e.target.value })
                        }}
                        id={"taskName"}
                        placeholder={"Enter name"}
                    />
                </div>
                <div className="modal__inputData">
                    {/*<label className='modal__label' htmlFor="">Enter a task's description</label>*/}
                    {/*<MyInputText*/}
                    {/*    value={newTask.description}*/}
                    {/*    onChange={e => {*/}
                    {/*        setNewTask({...newTask, description:e.target.value})*/}
                    {/*    }}*/}
                    {/*    disabled*/}
                    {/*/>*/}
                </div>
            </div>
            <MyButton onClick={_ =>{
                checkInput();
            }}>Add </MyButton>

        </Modal>
    );
};

export default TaskForm;