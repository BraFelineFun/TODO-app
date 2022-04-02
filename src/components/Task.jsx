import React from 'react';

const Task = ({task, setTasks}) => {
    function chec(f, g){
        console.log("checked=" + f)
        console.log("value=" + g)
    }
    return (
        <div className="list__cell">
            <div className="list__done">
                <input
                    onChange={event => setTasks({...task, done:event.target.checked})}
                    checked={task.done}
                    type="checkbox"
                />
            </div>
            <div className="list__label">
                <label>{task.text}</label>
            </div>
        </div>
    );
};

export default Task;