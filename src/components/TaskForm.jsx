import React, {useState} from 'react';
import MyInputText from "./UI/input/MyInput_text";
import MyButton from "./UI/button/MyButton";
import Modal from "./UI/modal/modal";

const TaskForm = ({addNewTask, isModal, closeModal}) => {

    const [newTask, setNewTask] = useState({
        id: 0,
        done: false,
        text: ''
    })

    function createNewTask (){
        addNewTask(newTask);
        closeModal();
        setNewTask({id:0, done: false, text: ''})
    }

    return (
        <Modal isModal={isModal} closeModal={closeModal}>

            <h2 className='modal__h2'>Add a new task</h2>
            <div className="modal__form">
                <div className="modal__inputData">
                    <label className='modal__label' htmlFor="taskName">Enter a task's name</label>
                    <MyInputText
                        value={newTask.text}
                        onChange={e => {
                            setNewTask({...newTask, id:Date.now(), text:e.target.value })
                        }}
                        id={"taskName"}
                        placeholder={"Enter name"}
                    />
                </div>
                <div className="modal__inputData">
                    <label className='modal__label' htmlFor="">Enter a task's description</label>
                    <MyInputText
                        value={newTask.description}
                        onChange={e => {
                            setNewTask({...newTask, description:e.target.value})
                        }}
                        disabled
                    />
                </div>
            </div>
            <MyButton onClick={createNewTask}>Add </MyButton>

        </Modal>
    );
};

export default TaskForm;