import React from 'react';

const Task = ({task, setCheck, removeTask}) => {


    return (
        <div className="list__cell">
            <div className="list__done">
                <input
                    onChange={event => setCheck(task.id, event.target.checked)}
                    checked={task.done}
                    type="checkbox"
                />
            </div>
            <div className="list__label">
                <span
                    style={{
                        color:"black",
                        textDecoration: task.done? 'line-through' :'none'
                }}
                >
                    <label style={{color:"white"}}>  {task.text} </label>
                </span>

            </div>
            <div className="list__delete">
                <img
                    src="http://cdn.onlinewebfonts.com/svg/img_126115.png"
                    alt={"delete"}
                    onClick={() => {removeTask(task)}}
                />
            </div>
            
        </div>
    );
};

export default Task;