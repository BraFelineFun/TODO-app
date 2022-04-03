import React from 'react';
import Task from "./Task";

const TaskList = ({tasks, setCheck, removeTask, title}) => {

    return (
        <div className="list">
            <h1>{title}</h1>
            {tasks.map((task) =>
                <Task
                    key={task.id}
                    task={task}
                    setCheck={setCheck}
                    removeTask={removeTask}
                />)}
        </div>
    );
};

export default TaskList;