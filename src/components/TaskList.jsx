import React from 'react';
import Task from "./Task";

const TaskList = ({tasks, setTasks}) => {
    function cons(){
        console.log(tasks.length)
    }
    return (
        <div className="list">
            {/*<h1></h1>*/}
            <h2 style={{textAlign:"center"}}>
                {tasks.length !== 0
                    ? tasks.map((task) => <Task key={task.id} task={task} setTasks={setTasks}/>)
                    : "Все задачи выполнены!!"
                }
            </h2>
        </div>
    );
};

export default TaskList;