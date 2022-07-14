import React from 'react';
import classes from './Validation.module.css'
import ok from '../../../imgs/Ok.png'

const Validation = React.memo(({correct, title, children, ...props}) => {
    const [titleMain, ...titleRest] = title.split(" ");
    return (
        <div className={classes.validatePass} {...props}>
            <div className={classes.validateImg}>
                {correct?
                    <img src={ok} alt=""/>:
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt=""/>
                }
                <p><b>{titleMain}</b> {titleRest.join(" ")}</p>
            </div>
            <div className={classes.passDescription}>
                <hr/>
                {children}
            </div>
        </div>
    );
});

export default (Validation);