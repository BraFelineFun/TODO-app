import React from 'react';
import Task from "./Task";

const TaskList = ({tasks, setCheck, removeTask, title}) => {

    return (
        <div className={"list__wrapper"}>
            <div className="content__placeholder"></div>

            <div className="list">
                <h1>{title}</h1>
                <hr/>
                {tasks.length !== 0
                    ?tasks.map((task) =>
                        <Task
                            key={task.id}
                            task={task}
                            setCheck={setCheck}
                            removeTask={removeTask}
                        />)
                    :   <h2 style={{marginTop: "20px", fontStyle:"italic", paddingLeft:"15px"}}>
                            There's nothing here yet :)
                        </h2>
                }
            </div>
        </div>

    );
};

export default TaskList;